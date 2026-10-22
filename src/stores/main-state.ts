import { defineStore } from "pinia";
import { forgeNewUserId } from "../utils/user-id";
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
    if (storage) return JSON.parse(storage);
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

  async function handleBufferedResponse(
    response: Response,
    mainStoreInstance: ReturnType<typeof useMainStore>,
  ): Promise<void> {
    let res;
    try {
      res = await response.json();
    } catch (error) {
      console.log(error);
      notifyError();
      return;
    }

    res.responses.forEach((resp: any) => {
      delete resp.type;
      delete resp.version;

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
    });
  }

  async function handleStreamedResponseDirect(
    tockEndPoint: string,
    message: string,
    userId: string,
    locale: string,
    mainStoreInstance: ReturnType<typeof useMainStore>,
    headers: Headers,
  ): Promise<void> {
    console.log("🔄 SSE: Starting direct SSE request to /sse/direct");

    // Prepare the request body with streamedResponse flag (required for SSE mode)
    const payload: TockQuery = {
      query: message,
      userId: userId,
      locale: locale,
      sourceWithContent:
        appOptions.preferences.messages.footNotes.requireSourcesContent,
      streamedResponse: true,
    };

    // Use the /sse/direct endpoint
    const ssePath = tockEndPoint.replace(/\/$/, "") + "/sse/direct";
    console.log(`🔄 SSE: POST to ${ssePath}`);

    try {
      // Send with proper JSON content-type (backend CORS should allow it)
      console.log(`🔄 SSE: Sending payload:`, payload);
      const response = await fetch(ssePath, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          `🔄 SSE: Request failed with status ${response.status}`,
        );
        notifyError();
        return;
      }

      console.log(`🔄 SSE: Response received, content-type: ${response.headers.get("content-type")}`);
      await handleStreamedResponse(response, mainStoreInstance);
    } catch (error) {
      console.error("🔄 SSE: Direct SSE request error:", error);
      notifyError();
    }
  }

  async function handleStreamedResponse(
    response: Response,
    mainStoreInstance: ReturnType<typeof useMainStore>,
  ): Promise<void> {
    console.log("🔄 SSE: Starting streaming response handler");

    const streamingMsg: Message = {
      type: MessageType.message,
      author: MessageAuthor.bot,
      text: "",
      streaming: true,
      date: Date.now(),
    };
    mainStoreInstance.addMessage(streamingMsg);
    // Grab the reactive proxy that Vue created on push; mutating the raw
    // `streamingMsg` object would not trigger reactivity.
    const reactiveMsg = state.value.messages[
      state.value.messages.length - 1
    ] as TextMessage;
    console.log("🔄 SSE: Added streaming message to store");

    // Timeout protection: abort if no LAST_ANSWER after 60 seconds
    // (backend timeout is 55s, this gives 5s buffer)
    const STREAMING_TIMEOUT_MS = 60000;
    const timeoutHandle = setTimeout(() => {
      console.warn("🔄 SSE: Streaming timeout after 60s - no LAST_ANSWER received");
      reactiveMsg.streaming = false;
      if (!reactiveMsg.text) {
        reactiveMsg.text = "[Response timeout - no data received]";
      }
      reader?.cancel().catch(() => {
        /* ignore cancel errors */
      });
    }, STREAMING_TIMEOUT_MS);

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    try {
      if (!response.body) {
        console.error("🔄 SSE: response.body is null!");
        notifyError();
        return;
      }

      reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let chunkCount = 0;
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) {
          console.log(`🔄 SSE: Stream ended after ${chunkCount} chunks`);
          break;
        }

        chunkCount++;
        buffer += decoder.decode(value, { stream: true });
        console.log(`🔄 SSE: Received chunk ${chunkCount}, buffer length: ${buffer.length}`);

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const rawEvent of events) {
          if (!rawEvent.trim()) continue;

          console.log(`🔄 SSE: Processing event: ${rawEvent.substring(0, 50)}...`);

          const lines = rawEvent.split("\n");
          let eventType = "";
          let data = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) eventType = line.slice(7);
            if (line.startsWith("data: ")) data = line.slice(6);
          }

          console.log(`🔄 SSE: Event type: ${eventType}`);

          // Progressive token delta emitted by the web connector during RAG
          // streaming: append it immediately for word-by-word display.
          // See: docs-vue-kit-streaming-integration.md § 3.1
          if (eventType === "token" && data) {
            try {
              const tok = JSON.parse(data);
              if (!tok.content || typeof tok.content !== "string") {
                console.error("🔄 SSE: Invalid token format (missing/non-string content):", tok);
                continue;
              }
              reactiveMsg.text = (reactiveMsg.text ?? "") + tok.content;
              mainStoreInstance.scrollMessages();
            } catch (tokErr) {
              console.error("🔄 SSE: Failed to parse token data:", tokErr);
              // Continue on token parse error - don't abort entire stream
            }
            continue;
          }

          if (eventType !== "message" || !data) {
            console.log(`🔄 SSE: Skipping event (type: ${eventType}, hasData: ${!!data})`);
            continue;
          }

          try {
            const res = JSON.parse(data);
            console.log(`🔄 SSE: Parsed response:`, res);

            if (res.responses?.length > 0) {
              const first = res.responses[0];
              if ("text" in first && first.text) {
                // Detect text divergence (guardrails, rewrite, etc.)
                // See: docs-vue-kit-streaming-integration.md § 5.3
                const tokenAccumulated = reactiveMsg.text || "";
                if (tokenAccumulated !== first.text && tokenAccumulated.length > 0) {
                  console.warn(
                    "🔄 SSE: Text rewrite detected (guardrails/condensation):",
                    {
                      fromTokens: tokenAccumulated.length,
                      final: first.text.length,
                    },
                  );
                }
                // Replace with canonical text (source of truth from backend)
                reactiveMsg.text = first.text;
                console.log(`🔄 SSE: Updated text length: ${first.text.length}`);
              }
              if (first.buttons) {
                reactiveMsg.buttons = first.buttons;
              }
              if (first.footnotes) {
                reactiveMsg.footnotes = first.footnotes;
              }
            }

            mainStoreInstance.scrollMessages();

            // Backend sends metadata key LAST_ANSWER = "true" on the final message event.
            // Accepts both uppercase (LAST_ANSWER) and camelCase (lastAnswer) for compatibility.
            // See: docs-streaming-rag-activation.md § 2
            if (
              res.metadata?.LAST_ANSWER === "true" ||
              res.metadata?.lastAnswer === "true"
            ) {
              console.log("🔄 SSE: lastAnswer detected, stopping stream");
              reactiveMsg.streaming = false;
              await reader.cancel();
              finished = true;
              break;
            }
          } catch (parseError) {
            console.error("🔄 SSE: Failed to parse message event data:", parseError);
            // Continue on parse error - don't abort entire stream
          }
        }
      }

      reactiveMsg.streaming = false;
      console.log("🔄 SSE: Stream completed successfully");
    } catch (error) {
      console.error("🔄 SSE: Streaming error:", error);
      reactiveMsg.streaming = false;
      notifyError();
    } finally {
      clearTimeout(timeoutHandle);
    }
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

      mainStoreInstance.clearLoaderMessages();

      if (appOptions.preferences.messages.streamedResponse) {
        console.log("🔄 SSE: Using streaming GET /sse/direct endpoint");
        await handleStreamedResponseDirect(
          tockEndPoint!,
          message,
          state.value.userId,
          locale,
          mainStoreInstance,
          getHeaders(),
        );
      } else {
        console.log("📦 Buffered: Using normal POST endpoint");
        let query;
        try {
          query = await fetch(tockEndPoint!, {
            method: "post",
            body: JSON.stringify(payload),
            headers: getHeaders(),
          });
        } catch (error) {
          console.log(error);
          notifyError();
          return;
        }

        if (!query.ok) {
          console.log(query);
          notifyError();
          return;
        }

        await handleBufferedResponse(query, mainStoreInstance);
      }

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
      isLoading.value = false;
    }
  }

  function clearHistory(): void {
    state.value.messages = [];
    state.value.userId = forgeNewUserId(); // New userId = new session on the server side
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
