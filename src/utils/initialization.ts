import { appOptionsSingleton } from "@/utils/app-options-singleton";
import { useMainStore } from "@/stores/main-state";
import { MessageAuthor, MessageType } from "@/models/messages";

function injectCssRevert() {
  var style = document.createElement("style");

  style.innerHTML = `@namespace only_html "http://www.w3.org/1999/xhtml"; .tvk-wrapper only_html|* {all: revert;}`;

  //WebKit Hack
  style.appendChild(document.createTextNode(""));

  document.head.insertBefore(style, document.head.childNodes[0]);
}

export function appInitialization(): void {
  injectCssRevert();

  const appOptions = appOptionsSingleton.getOptions();

  if (
    appOptions?.initialization?.welcomeMessage ||
    appOptions?.initialization?.openingMessage
  ) {
    const mainStore = useMainStore();
    const storedState = mainStore.getStoredState();

    if (!storedState || !storedState.messages.length) {
      if (appOptions.initialization.welcomeMessage) {
        mainStore.addMessage({
          type: MessageType.message,
          author: MessageAuthor.bot,
          date: Date.now(),
          text: appOptions.initialization.welcomeMessage,
        });
      }

      if (appOptions.initialization.openingMessage) {
        mainStore.sendUserMessage(
          appOptions.initialization.openingMessage,
          false
        );
      }
    }
  }
}
