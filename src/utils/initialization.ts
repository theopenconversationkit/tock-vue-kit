import appOptionsSingleton from '@/utils/app-options';
import { useMainStore } from '@/stores/main-state';
import { MessageAuthor, MessageType } from '@/models/messages';

export function appInitialization(): void {
  const appOptions = appOptionsSingleton.getInstance().options;

  if (appOptions?.initialization?.welcomeMessage || appOptions?.initialization?.openingMessage) {
    const mainStore = useMainStore();
    const storedState = mainStore.getStoredState();

    if (!storedState || !storedState.messages.length) {
      if (appOptions.initialization.welcomeMessage) {
        mainStore.addMessage({
          type: MessageType.message,
          author: MessageAuthor.bot,
          date: Date.now(),
          text: appOptions.initialization.welcomeMessage
        });
      }

      if (appOptions.initialization.openingMessage) {
        mainStore.sendUserMessage(appOptions.initialization.openingMessage, false);
      }
    }
  }
}
