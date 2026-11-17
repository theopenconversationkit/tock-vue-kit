import { defineStore } from "pinia";
import { forgeNewUserId, forgeRequestId } from "../utils/user-id";
import { computed, inject, ref, type ComputedRef, type Ref } from "vue";
import { tockEndpointKey } from "../keys/app-keys";
import type { mainState } from "../models/main-state";
import {
  MessageAuthor,
  MessageType,
  FeedbackVoteValue,
  type Message,
  type TextMessage,
  NotificationMessageStyle,
} from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import type { TockQuery } from "../models/query";

const MAIN_STORE_NAME: string = "main";

const STORE_NAME: string = "main_storage";

const initNewState = (): mainState => ({
  userId: forgeNewUserId(),
  messages: [],
});

export const useMainStore = defineStore(MAIN_STORE_NAME, () => {
  const tockEndPoint = inject<string>(tockEndpointKey);

  const appOptions = appOptionsSingleton.getOptions();

  const state: Ref<mainState> = ref(getState());

  function updateApplication() {
    // empty action watched by App component to refresh app
  }

  function getState(): mainState {
    if (appOptions.localStorage.enabled) {
      const storedState = getStoredState();
      if (storedState) return storedState;
    }

    return initNewState();
  }

  function getStoredState() {
    if (!appOptions.localStorage.enabled) return false;
    const storage = localStorage.getItem(getStorageKey());
    if (storage) {
      const parsed = JSON.parse(storage);
      // a message restored from the storage can never still be streaming
      parsed.messages?.forEach((m: Message) => {
        if (m.type === MessageType.message)
          (m as TextMessage).streaming = false;
      });
      return parsed;
    }
    return false;
  }

  function getStorageKey(): string {
    let storageKey = STORE_NAME;
    if (appOptions.localStorage.prefix) {
      storageKey = `${STORE_NAME}_${appOptions.localStorage.prefix}`;
    }
    return storageKey;
  }

  const getMessages: ComputedRef<Message[]> = computed(
    () => state.value.messages,
  );

  function clearLoaderMessages(): void {
    state.value.messages = state.value.messages.filter((mssg) => {
      return mssg.type !== MessageType.loader;
    });
  }

  function clearNotificationMessages(): void {
    state.value.messages = state.value.messages.filter((mssg) => {
      return mssg.type !== MessageType.notification;
    });
  }

  function scrollMessages(): void {
    // empty action watched by messages component to scroll down when a message is added or images load
  }

  function addMessage(message: Message): void {
    const mainStoreInstance = useMainStore();
    mainStoreInstance.clearNotificationMessages();
    mainStoreInstance.clearLoaderMessages();

    // TEMP_ReplaceImageByPlaceholder(message);

    state.value.messages.push(message);
    mainStoreInstance.scrollMessages();
  }

  // function TEMP_ReplaceImageByPlaceholder(message: Message) {
  //   function getFileUrl() {
  //     const factor = 500;
  //     const widthRand = Math.max(Math.random(), 0.3);
  //     const heightRand = Math.max(Math.random(), 0.3);
  //     const width = Math.ceil(widthRand * factor);
  //     const height = Math.ceil(heightRand * factor);
  //     const minCeiled = Math.ceil(1);
  //     const maxFloored = Math.floor(1084);
  //     const imgId = Math.floor(
  //       Math.random() * (maxFloored - minCeiled) + minCeiled
  //     );

  //     return `https://picsum.photos/id/${imgId}/${width}/${height}`;
  //   }

  //   if (message.type === MessageType.card) {
  //     message.file.url = getFileUrl();
  //   }

  //   if (message.type === MessageType.carousel) {
  //     message.cards.forEach((card) => {
  //       card.file.url = getFileUrl();
  //     });
  //   }
  // }

  function getHeaders(): Headers {
    const headers = new Headers({ "Content-Type": "application/json" });

    if (appOptions.initialization.extraHeaders) {
      Object.entries(appOptions.initialization.extraHeaders).forEach(
        (entry) => {
          headers.append(entry[0], entry[1]);
        },
      );
    }

    return headers;
  }

  function notifyError() {
    const mainStoreInstance = useMainStore();
    mainStoreInstance.addMessage({
      type: MessageType.error,
      author: MessageAuthor.app,
      date: Date.now(),
      text: appOptions.wording.connectionErrorMessage,
    });
  }

  function removeMessage(message: Message | undefined): void {
    if (!message) return;
    state.value.messages = state.value.messages.filter((m) => m !== message);
  }

  // The request failed: end it cleanly, no provisional bubble or loader left behind and
  // no late frame able to recreate the bubble
  function abortStreamedResponse(): void {
    const responseId = activeResponseId;
    if (responseId) {
      finishedResponseIds.add(responseId);
      removeMessage(findMessageByResponseId(responseId));
    }
    activeResponseId = null;
    useMainStore().clearLoaderMessages();
  }

  async function handleBufferedResponse(
    response: Response,
    mainStoreInstance: ReturnType<typeof useMainStore>,
  ): Promise<void> {
    let res;
    try {
      res = await response.json();
    } catch (error) {
      console.log(error);
      abortStreamedResponse();
      notifyError();
      return;
    }

    const metadata = res.metadata ?? {};
    const replaceActionId: string | undefined =
      metadata[STREAM_REPLACE_METADATA];

    // Legacy streaming (Bot API enableStreaming, or a server without the common contract):
    // each SSE frame of the request is also an entry of the POST response, at the same position,
    // the streamed fragments included. The fragments are already merged in their bubble: skip them.
    if (!replaceActionId && sseFrames.some((frame) => frame !== null)) {
      handleLegacyStreamedResponse(res.responses, mainStoreInstance);
      return;
    }

    const responseId: string | undefined =
      metadata.RESPONSE_ID ?? activeResponseId ?? undefined;
    const streamed = findMessageByResponseId(responseId);
    if (responseId) finishedResponseIds.add(responseId);
    desyncedResponseIds.delete(responseId ?? "");

    // Only one final message replaces the streamed bubble: the one designated by the server
    // (its actionId); without designation (older server), the first text. The others are added in order.
    let replaced = false;

    res.responses.forEach((resp: any) => {
      delete resp.type;
      delete resp.version;

      const replacesBubble =
        "text" in resp &&
        streamed &&
        !replaced &&
        (replaceActionId ? resp.actionId === replaceActionId : true);

      if (replacesBubble) {
        // final answer: replaces the partial text received through SSE
        Object.assign(streamed, resp, { streaming: false });
        replaced = true;
        mainStoreInstance.scrollMessages();
      } else {
        addBotResponse(resp, mainStoreInstance);
      }
    });

    // No final message replaced the streamed text (explicit discard, redirection, empty answer): remove it
    if (streamed && !replaced) removeMessage(streamed);
    activeResponseId = null;
  }

  function handleLegacyStreamedResponse(
    responses: any[],
    mainStoreInstance: ReturnType<typeof useMainStore>,
  ): void {
    const frames = sseFrames;
    responses.forEach((resp: any, index: number) => {
      // streamed fragment already displayed in its bubble
      if (index < frames.length && frames[index] !== null) return;
      delete resp.type;
      delete resp.version;
      addBotResponse(resp, mainStoreInstance);
    });

    // the streamed bubbles keep their merged text
    new Set(frames.filter((frame): frame is string => frame !== null)).forEach(
      (streamId) => {
        finishedResponseIds.add(streamId);
        desyncedResponseIds.delete(streamId);
        const bubble = findMessageByResponseId(streamId);
        if (bubble) bubble.streaming = false;
      },
    );
    sseFrames = [];
    activeResponseId = null;
    mainStoreInstance.scrollMessages();
  }

  function addBotResponse(
    resp: any,
    mainStoreInstance: ReturnType<typeof useMainStore>,
  ): void {
    if ("text" in resp) {
      mainStoreInstance.addMessage({
        type: MessageType.message,
        author: MessageAuthor.bot,
        date: Date.now(),
        ...resp,
      });
    } else if ("card" in resp) {
      mainStoreInstance.addMessage({
        type: MessageType.card,
        author: MessageAuthor.bot,
        date: Date.now(),
        ...resp.card,
      });
    } else if ("image" in resp) {
      mainStoreInstance.addMessage({
        type: MessageType.image,
        author: MessageAuthor.bot,
        date: Date.now(),
        ...resp.image,
      });
    } else if ("carousel" in resp) {
      mainStoreInstance.addMessage({
        type: MessageType.carousel,
        author: MessageAuthor.bot,
        date: Date.now(),
        ...resp.carousel,
      });
    }
  }

  // Streaming: the bot pushes partial answers on the standard SSE channel (GET /sse),
  // flagged TOCK_STREAM_RESPONSE and identified by RESPONSE_ID. The final answer
  // comes back in the POST response and replaces the streamed message.
  const STREAM_RESPONSE_METADATA = "TOCK_STREAM_RESPONSE";
  // Partial frames flagged "delta" only carry the end of the text: keep the first
  // TOCK_STREAM_KEEP characters of the current message and append the frame text
  const STREAM_MODE_METADATA = "TOCK_STREAM_MODE";
  const STREAM_KEEP_METADATA = "TOCK_STREAM_KEEP";
  // Transient frame of an answer being generated (the final frames do not carry it)
  const STREAM_PARTIAL_METADATA = "TOCK_STREAM_PARTIAL";
  // actionId of the final message replacing the streamed bubble (the other messages are added)
  const STREAM_REPLACE_METADATA = "TOCK_STREAM_REPLACE";
  // The streamed bubble must be removed: no final message replaces it
  const STREAM_DISCARD_METADATA = "TOCK_STREAM_DISCARD";
  // Identifier generated by the client for each question, echoed on every frame of that request
  const REQUEST_ID_METADATA = "TOCK_REQUEST_ID";
  const SSE_OPEN_TIMEOUT_MS = 3000;

  let eventSource: EventSource | null = null;
  let eventSourceUserId: string | null = null;
  const finishedResponseIds = new Set<string>();
  // Streams whose delta frames are out of sync: ignored until the final response
  const desyncedResponseIds = new Set<string>();
  // Request in flight and response id of its streamed bubble, if any
  let activeRequestId: string | null = null;
  let activeResponseId: string | null = null;
  // SSE frames received for the request in flight, in order (partial frames excluded, as in the
  // react kit): RESPONSE_ID of a legacy streamed fragment, null for any other frame
  let sseFrames: (string | null)[] = [];

  function closeEventSource(): void {
    eventSource?.close();
    eventSource = null;
    eventSourceUserId = null;
  }

  function ensureEventSource(): Promise<void> {
    const userId = state.value.userId;
    if (
      eventSource &&
      eventSourceUserId === userId &&
      eventSource.readyState !== EventSource.CLOSED
    ) {
      return Promise.resolve();
    }
    closeEventSource();

    const url = `${tockEndPoint!.replace(/\/$/, "")}/sse?userid=${encodeURIComponent(userId)}`;
    const source = new EventSource(url);
    eventSource = source;
    eventSourceUserId = userId;

    source.addEventListener("message", (event) => {
      try {
        handleSseMessage(JSON.parse((event as MessageEvent).data));
      } catch (error) {
        console.error("Failed to parse SSE message", error);
      }
    });

    // If the channel cannot be opened, the answer simply arrives in one piece with the POST response
    return new Promise<void>((resolve) => {
      const done = () => resolve();
      source.addEventListener("open", done, { once: true });
      source.addEventListener("error", done, { once: true });
      setTimeout(done, SSE_OPEN_TIMEOUT_MS);
    });
  }

  function findMessageByResponseId(
    responseId?: string,
  ): TextMessage | undefined {
    if (!responseId) return undefined;
    return state.value.messages.find(
      (m) => m.type === MessageType.message && m.responseId === responseId,
    ) as TextMessage | undefined;
  }

  function handleSseMessage(res: any): void {
    const metadata = res.metadata ?? {};
    const responseId: string | undefined = metadata.RESPONSE_ID;
    // frames of a request that is not ours (other tab or device of the same user) or received at rest
    if (!activeRequestId) return;
    const requestId: string | undefined = metadata[REQUEST_ID_METADATA];
    if (requestId && requestId !== activeRequestId) return;

    // Every frame of the request is also in the POST response (legacy contract): remember its position
    if (metadata[STREAM_PARTIAL_METADATA] !== "true") {
      const legacyFragment =
        !!responseId &&
        metadata[STREAM_RESPONSE_METADATA] === "true" &&
        !metadata[STREAM_REPLACE_METADATA] &&
        metadata[STREAM_DISCARD_METADATA] !== "true" &&
        !finishedResponseIds.has(responseId);
      sseFrames.push(legacyFragment ? responseId! : null);
    }

    if (!responseId) return;
    // a frame can arrive after the final POST response
    if (finishedResponseIds.has(responseId)) return;

    if (metadata[STREAM_DISCARD_METADATA] === "true") {
      finishedResponseIds.add(responseId);
      removeMessage(findMessageByResponseId(responseId));
      activeResponseId = null;
      return;
    }

    if (metadata[STREAM_RESPONSE_METADATA] !== "true") return;

    const first = res.responses?.[0];
    if (!first || !("text" in first)) return;

    const existing = findMessageByResponseId(responseId);

    // final frame designated as the replacement of the streamed bubble
    if (
      metadata[STREAM_REPLACE_METADATA] &&
      metadata[STREAM_PARTIAL_METADATA] !== "true"
    ) {
      if (existing && first.actionId === metadata[STREAM_REPLACE_METADATA]) {
        delete first.type;
        delete first.version;
        Object.assign(existing, first, { streaming: false });
        useMainStore().scrollMessages();
      }
      return;
    }

    const delta = metadata[STREAM_MODE_METADATA] === "delta";
    if (delta && desyncedResponseIds.has(responseId)) return;

    if (existing) {
      if (delta) {
        const keep = Number(metadata[STREAM_KEEP_METADATA]);
        if (
          !Number.isInteger(keep) ||
          keep < 0 ||
          keep > existing.text.length
        ) {
          // out of sync: keep what is displayed and wait for the final response
          desyncedResponseIds.add(responseId);
          return;
        }
        existing.text = existing.text.slice(0, keep) + first.text;
      } else {
        existing.text = first.text;
      }
      useMainStore().scrollMessages();
      return;
    }

    activeResponseId = responseId;
    useMainStore().addMessage({
      type: MessageType.message,
      author: MessageAuthor.bot,
      date: Date.now(),
      text: first.text,
      responseId,
      streaming: true,
    });
  }

  const isLoading: Ref<boolean> = ref(false);

  async function sendUserMessage(
    message: string,
    addToHistory = true,
  ): Promise<void> {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
      const mainStoreInstance = useMainStore();

      if (appOptions.preferences.messages.clearOnNewRequest) {
        state.value.messages = [];
      }

      if (addToHistory) {
        mainStoreInstance.addMessage({
          type: MessageType.message,
          author: MessageAuthor.user,
          text: message,
          date: Date.now(),
        });
      }

      mainStoreInstance.addMessage({
        type: MessageType.loader,
        author: MessageAuthor.app,
        date: Date.now(),
      });

      const locale = navigator.language;
      const payload: TockQuery = {
        query: message,
        userId: state.value.userId,
        locale: locale,
        sourceWithContent:
          appOptions.preferences.messages.footNotes.requireSourcesContent,
      };
      if (appOptions.preferences.messages.streamedResponse) {
        payload.requestId = forgeRequestId();
        if (appOptions.preferences.messages.deltaStreaming) {
          payload.streamMode = "delta";
        }
        activeRequestId = payload.requestId;
        activeResponseId = null;
        sseFrames = [];
        await ensureEventSource();
      }

      let query;
      try {
        query = await fetch(tockEndPoint!, {
          method: "post",
          body: JSON.stringify(payload),
          headers: getHeaders(),
        });
      } catch (error) {
        console.log(error);
        abortStreamedResponse();
        notifyError();
        return;
      }

      if (!query.ok) {
        console.log(query);
        abortStreamedResponse();
        notifyError();
        return;
      }

      await handleBufferedResponse(query, mainStoreInstance);

      if (appOptions.localStorage.enabled) {
        let stateCopy = JSON.stringify(state.value);

        if (
          appOptions.localStorage.maxNumberMessages &&
          state.value.messages.length >
            appOptions.localStorage.maxNumberMessages
        ) {
          const stateRevived = JSON.parse(stateCopy);

          const startIndex =
            stateRevived.messages.length -
            parseInt(
              appOptions.localStorage.maxNumberMessages as unknown as string,
            );

          if (startIndex) {
            stateRevived.messages = stateRevived.messages.slice(
              startIndex,
              stateRevived.messages.length + 1,
            );
          }

          stateCopy = JSON.stringify(stateRevived);
        }

        localStorage.setItem(getStorageKey(), stateCopy);
      }
    } finally {
      activeRequestId = null;
      activeResponseId = null;
      sseFrames = [];
      isLoading.value = false;
    }
  }

  function clearHistory(): void {
    state.value.messages = [];
    state.value.userId = forgeNewUserId(); // New userId = new session on the server side
    closeEventSource();
    finishedResponseIds.clear();
    desyncedResponseIds.clear();
    sseFrames = [];
    if (appOptions.localStorage.enabled) {
      localStorage.setItem(getStorageKey(), JSON.stringify(state.value));
    }
  }

  async function reportFeedback(
    message: Message,
    vote: FeedbackVoteValue | null,
  ): Promise<void> {
    const mainStoreInstance = useMainStore();

    message.metadata = message.metadata || {};

    const existingVote = message.metadata.feedback?.vote || null;

    // reset previous vote if same button is clicked
    if (message.metadata?.feedback?.vote === vote) vote = null;

    // Write the vote optimistically
    message.metadata.feedback = { vote };

    // Send to bot
    try {
      const locale = navigator.language;
      const payload = {
        userId: state.value.userId,
        locale: locale,
        feedback: {
          actionId: message.actionId,
          vote: vote,
        },
      };

      const query = await fetch(tockEndPoint!, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: getHeaders(),
      });

      if (query.ok) {
        // Persist to localStorage if query ok and local storage enabled
        if (appOptions.localStorage.enabled) {
          localStorage.setItem(getStorageKey(), JSON.stringify(state.value));
        }
        mainStoreInstance.addMessage({
          type: MessageType.notification,
          author: MessageAuthor.app,
          date: Date.now(),
          message: appOptions.wording.messages.feedback.confirmationMessage,
          style: NotificationMessageStyle.Info,
        });
      } else {
        // Revert the optimistic update
        message.metadata.feedback!.vote = existingVote;
        mainStoreInstance.addMessage({
          type: MessageType.notification,
          author: MessageAuthor.app,
          date: Date.now(),
          message: appOptions.wording.messages.feedback.errorMessage,
          style: NotificationMessageStyle.Warning,
        });
        console.warn("Failed to report feedback to bot.");
      }
    } catch (error) {
      // Revert the optimistic update
      message.metadata.feedback!.vote = existingVote;
      mainStoreInstance.addMessage({
        type: MessageType.notification,
        author: MessageAuthor.app,
        date: Date.now(),
        message: appOptions.wording.messages.feedback.errorMessage,
        style: NotificationMessageStyle.Warning,
      });
      console.warn("Failed to report feedback to bot:", error);
    } finally {
      setTimeout(() => {
        mainStoreInstance.clearNotificationMessages();
      }, 3000);
    }
  }

  return {
    state,
    updateApplication,
    getStoredState,
    getMessages,
    sendUserMessage,
    addMessage,
    clearHistory,
    clearNotificationMessages,
    clearLoaderMessages,
    scrollMessages,
    reportFeedback,
    isLoading,
  };
});
