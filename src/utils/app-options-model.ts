import type {
  AppOptionsModel,
  Initialization,
  LocalStorage,
  Preferences,
  Wording,
} from "../models/app-options-model";

const localStorage: LocalStorage = {
  enabled: {
    title: "Local storage",
    type: "boolean",
    default: false,
    description: "Retain conversation history in local storage",
    index: 1,
  },
  prefix: {
    title: "Local storage prefix",
    type: "string",
    default: undefined,
    description:
      "Prefix for local storage keys allowing communication with different bots from the same domain",
    index: 1.1,
    conditions: ["localStorage.enabled"],
  },
  maxNumberMessages: {
    title: "Maximum messages",
    type: "number",
    default: 20,
    description: "Maximum number of messages to store in local storage",
    index: 2,
    conditions: ["localStorage.enabled"],
  },
};

const initialization: Initialization = {
  extraHeaders: {
    title: "Extra headers",
    type: "KeyValues",
    default: undefined,
    description:
      "Additional HTTP header key/value pairs to be supplied in requests. Warning : Tock server configuration required.",
    index: 1,
  },
  welcomeMessage: {
    title: "Welcome message",
    type: "string",
    default: undefined,
    description:
      "Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.",
    index: 2,
  },
  openingMessage: {
    title: "Opening message",
    type: "string",
    default: undefined,
    description:
      "Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any.",
    index: 3,
  },
};

const preferences: Preferences = {
  messages: {
    hideIfNoMessages: {
      title: "Hide messages if no messages",
      type: "boolean",
      default: true,
      description:
        "Hide messages container if there is no messages to display.",
      index: 20,
    },
    clearOnNewRequest: {
      title: "Clear on new request",
      type: "boolean",
      default: false,
      description:
        "If true, deletes previous messages when a new user request is sent",
      index: 21,
    },
    message: {
      hideUserMessages: {
        title: "Hide user messages",
        type: "boolean",
        default: false,
        description: "If true, user messages are not displayed.",
        index: 22,
      },
      header: {
        display: {
          title: "Display header",
          type: "boolean",
          default: true,
          description: "Display a header above message.",
          index: 1,
        },
        avatar: {
          display: {
            title: "Display header avatar",
            type: "boolean",
            default: true,
            description: "Display an avatar in message header.",
            index: 3,
            conditions: ["preferences.messages.message.header.display"],
          },
          userIcon: {
            title: "Avatar User icon",
            type: "string",
            default: "bi bi-person-fill",
            description:
              "Class name of the user avatar icon (displayed only if User image is not defined).",
            index: 3.1,
            conditions: ["preferences.messages.message.header.display"],
          },
          userImage: {
            title: "Avatar User image",
            type: "ImageDef",
            default: undefined,
            description: "Image of the user avatar",
            index: 3.2,
            conditions: ["preferences.messages.message.header.display"],
          },
          botIcon: {
            title: "Avatar Bot icon",
            type: "string",
            default: "bi bi-robot",
            description:
              "Class name of the bot avatar icon (displayed only if Bot image is not defined).",
            index: 3.3,
            conditions: ["preferences.messages.message.header.display"],
          },
          botImage: {
            title: "Avatar Bot image",
            type: "ImageDef",
            default: undefined,
            description: "Image of the bot avatar",
            index: 3.4,
            conditions: ["preferences.messages.message.header.display"],
          },
        },
        label: {
          display: {
            title: "Display header label",
            type: "boolean",
            default: true,
            description:
              "Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content).",
            index: 2,
            conditions: ["preferences.messages.message.header.display"],
          },
        },
      },
    },
    footNotes: {
      display: {
        title: "Display sources",
        type: "boolean",
        default: true,
        description:
          "For RAG answers, display the sources used to generate the answer if any.",
        index: 50,
      },
      requireSourcesContent: {
        title: "Request textual content of sources",
        type: "boolean",
        default: false,
        description:
          "For RAG answers, request the textual content of the source in addition to the source title and link.",
        index: 51,
        conditions: ["preferences.messages.footNotes.display"],
      },
      clampSourceContent: {
        title: "Clamp content of sources",
        type: "boolean",
        default: true,
        description:
          "For RAG answers with sources content, truncate the textual source content.",
        index: 52,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
        ],
      },
      clampSourceContentNbLines: {
        title: "Number of lines to clamp",
        type: "number",
        default: 2,
        description:
          "For RAG answers with sources content, number of lines after which to truncate text.",
        index: 53,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
          "preferences.messages.footNotes.clampSourceContent",
        ],
      },
      displayOnMessageSide: {
        title: "Display sources on the side of the answer",
        type: "boolean",
        default: false,
        description:
          "For RAG responses, any sources are displayed on one side of the message response rather than directly following the response.",
        index: 54,
        conditions: ["preferences.messages.footNotes.display"],
      },
    },
  },
  questionBar: {
    clearTypedCharsOnSubmit: {
      title: "Clear input on submit",
      type: "boolean",
      default: true,
      description:
        "Whether or not the question input should be cleared on submit.",
      index: 60,
    },
    maxUserInputLength: {
      title: "Max user message length",
      type: "number",
      default: 500,
      description: "Max length of the user input message string",
      index: 61,
    },
    clearHistory: {
      display: {
        title: "Show clear history button",
        type: "boolean",
        default: true,
        description:
          "Display the control allowing user to clear discussion history and local storage history, if any",
        index: 70,
      },
      icon: {
        title: "Clear history button icon",
        type: "string",
        default: "bi bi-trash-fill",
        description:
          "Class name of the clear history control icon (displayed only if no image is defined)",
        index: 71,
        conditions: ["preferences.questionBar.clearHistory.display"],
      },
      image: {
        title: "Clear history button image",
        type: "ImageDef",
        default: undefined,
        description: "Image of the clearHistory control",
        index: 72,
        conditions: ["preferences.questionBar.clearHistory.display"],
      },
    },
    submit: {
      icon: {
        title: "Submit button icon",
        type: "string",
        default: "bi bi-send-fill",
        description:
          "Class name of the submit control icon (displayed only if no image is defined)",
        index: 80,
      },
      image: {
        title: "Submit button image",
        type: "ImageDef",
        default: undefined,
        description: "Image of the submit control",
        index: 81,
      },
    },
  },
};

const wording: Wording = {
  messages: {
    message: {
      header: {
        labelUser: {
          title: "Message header user label",
          type: "string",
          default: "You",
          description: undefined,
        },
        labelBot: {
          title: "Message header bot label",
          type: "string",
          default: "Bot",
          description: undefined,
        },
      },
      footnotes: {
        sources: {
          title: "Footnotes label",
          type: "string",
          default: "Sources:",
          description: undefined,
        },
        showMoreLink: {
          title: "Footnotes label",
          type: "string",
          default: "> Show more",
          description: undefined,
        },
      },
    },
  },
  questionBar: {
    clearHistory: {
      title: "Clear history button label",
      type: "string",
      default: "",
      description: undefined,
    },
    clearHistoryAriaLabel: {
      title: "Clear history button Aria label",
      type: "string",
      default: "Clear discussion and history button",
      description: undefined,
    },
    input: {
      placeholder: {
        title: "User input placeholder",
        type: "string",
        default: "Ask me a question...",
        description: undefined,
      },
    },
    submit: {
      title: "Submit button label",
      type: "string",
      default: "",
      description: undefined,
    },
    submitAriaLabel: {
      title: "Submit button Aria label",
      type: "string",
      default: "Submit button",
      description: undefined,
    },
  },
  connectionErrorMessage: {
    title: "Connection error message",
    type: "string",
    default: "An unexpected error occured. Please try again later.",
    description: undefined,
  },
};

export const appOptionsModel: AppOptionsModel = {
  localStorage: localStorage,
  initialization: initialization,
  preferences: preferences,
  wording: wording,
};
