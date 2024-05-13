import { defineStore } from "pinia";
import { forgeNewUserId } from "../utils/user-id";
import { computed, inject, ref, type Ref } from "vue";
import { tockEndpointKey } from "../keys/app-keys";
import type { mainState } from "../models/main-state";
import { MessageAuthor, MessageType, type Message } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options";
import type { TockQuery } from "../models/query";

const MAIN_STORE_NAME: string = "main";

const STORE_NAME: string = "main_storage";

const initNewState = (): mainState => ({
  userId: forgeNewUserId(),
  messages: [],
});

export const useMainStore = defineStore(MAIN_STORE_NAME, () => {
  const tockEndPoint = inject<string>(tockEndpointKey);

  const appOptions = appOptionsSingleton.getInstance().options;

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

  const getMessages = computed(() => state.value.messages);

  function clearLoaderMessages(): void {
    state.value.messages = state.value.messages.filter((mssg) => {
      return mssg.type !== MessageType.loader;
    });
  }

  function scrollMessages(): void {
    // empty action watched by messages component to scroll down when a message is added or images load
  }

  function addMessage(message: Message): void {
    const mainStoreInstance = useMainStore();
    mainStoreInstance.clearLoaderMessages();
    mainStoreInstance.scrollMessages();

    TEMP_ReplaceImageByPlaceholder(message);

    state.value.messages.push(message);
  }

  function TEMP_ReplaceImageByPlaceholder(message: Message) {
    function getFileUrl() {
      const factor = 500;
      const widthRand = Math.max(Math.random(), 0.3);
      const heightRand = Math.max(Math.random(), 0.3);
      const width = Math.ceil(widthRand * factor);
      const height = Math.ceil(heightRand * factor);
      const minCeiled = Math.ceil(1);
      const maxFloored = Math.floor(1084);
      const imgId = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled
      );

      return `https://picsum.photos/id/${imgId}/${width}/${height}`;
    }

    if (message.type === MessageType.card) {
      message.file.url = getFileUrl();
    }

    if (message.type === MessageType.carousel) {
      message.cards.forEach((card) => {
        card.file.url = getFileUrl();
      });
    }
  }

  async function sendUserMessage(
    message: string,
    addToHistory = true
  ): Promise<void> {
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

    const res = await (
      await fetch(tockEndPoint!, {
        method: "post",
        body: JSON.stringify(payload),
      })
    ).json();

    mainStoreInstance.clearLoaderMessages();

    res.responses.forEach((response: any) => {
      delete response.type;
      delete response.version;

      if ("text" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.message,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response,
        });
      } else if ("card" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.card,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.card,
        });
      } else if ("image" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.image,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.image,
        });
      } else if ("carousel" in response) {
        mainStoreInstance.addMessage({
          type: MessageType.carousel,
          author: MessageAuthor.bot,
          date: Date.now(),
          ...response.carousel,
        });
      }
    });

    if (appOptions.localStorage.enabled) {
      let stateCopy = JSON.stringify(state.value);

      if (
        appOptions.localStorage.maxNumberMessages &&
        state.value.messages.length > appOptions.localStorage.maxNumberMessages
      ) {
        const stateRevived = JSON.parse(stateCopy);

        const startIndex =
          stateRevived.messages.length -
          parseInt(
            appOptions.localStorage.maxNumberMessages as unknown as string
          );

        if (startIndex) {
          stateRevived.messages = stateRevived.messages.slice(
            startIndex,
            stateRevived.messages.length + 1
          );
        }

        stateCopy = JSON.stringify(stateRevived);
      }

      localStorage.setItem(getStorageKey(), stateCopy);
    }
  }

  function clearHistory(): void {
    state.value.messages = [];
    if (appOptions.localStorage.enabled) {
      localStorage.setItem(getStorageKey(), JSON.stringify(state.value));
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
    clearLoaderMessages,
    scrollMessages,
  };
});
