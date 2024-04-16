export interface appOptions {
  localStorage: localStorageSettings;
  preferences: preferences;
  wording: wording;
  initialization?: initialization;
}

export interface initialization {
  /* Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any. */
  welcomeMessage?: string;

  /* Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any.*/
  openingMessage?: string;
}

export interface localStorageSettings {
  /* Enable local storage of convesation history */
  enabled: boolean;

  /* Maximum number of messages to store */
  maxNumberMessages: number;

  /* Prefix for local storage keys allowing communication with different bots from the same domain */
  prefix?: string;
}

export interface preferences {
  messages: {
    /* if true, deletes previous messages when a new user request is sent */
    clearOnNewRequest: boolean;

    message: {
      header: {
        /* display a header above message */
        display: boolean;

        avatar: {
          /* display an avatar in message header */
          display: boolean;

          /* icon class name of the user avatar (displayed only if no userImage is defined) */
          userIcon?: string;

          /* image of the user avatar */
          userImage?: imageDef;

          /* icon class name of the bot avatar (displayed only if no botImage is defined) */
          botIcon?: string;

          /* image of the bot avatar */
          botImage?: imageDef;
        };
        label: {
          /* display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content) */
          display: boolean;
        };
      };
    };
  };
  questionBar: {
    /* max length of the user input message string */
    maxUserInputLength: number;

    clearHistory: {
      /* display the control allowing user to clear discussion history and local storage history, if any */
      display: boolean;

      /* icon class name of the clearHistory control (displayed only if no image is defined) */
      icon?: string;

      /* image of the clearHistory control */
      image?: imageDef;
    };

    submit: {
      /* icon class name of the submit control (displayed only if no image is defined) */
      icon?: string;

      /* image of the submit control */
      image?: imageDef;
    };
  };
}

export interface imageDef {
  /* src of an image */
  src: string;

  /* display with of an image */
  width: string;

  /* display height of an image */
  height: string;
}

export interface wording {
  messages: {
    message: {
      header: {
        labelUser: string;
        labelBot: string;
      };
      footnotes: {
        sources: string;
      };
    };
  };
  questionBar: {
    clearHistory: {
      labelBefore: string;
      labelAfter: string;
    };
    input: {
      placeholder: string;
    };
    submit: {
      labelBefore: string;
      labelAfter: string;
    };
  };
}
