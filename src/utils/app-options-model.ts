import type {
  AppOptionsModel,
  Initialization,
  LocalStorage,
  Preferences,
  Wording,
} from "../models/app-options-model";

export const localStorage: LocalStorage = {
  enabled: {
    title: "Enable local storage",
    type: "boolean",
    default: false,
    description:
      "Enable/disable persistence of conversation history in the browser's localStorage. When disabled, messages are not saved between page refreshes.",
    index: 1,
  },
  prefix: {
    title: "Storage key prefix",
    type: "string",
    default: undefined,
    description:
      "Unique prefix for localStorage keys to prevent conflicts when multiple bots are used on the same domain. If undefined, a default prefix is used.",
    index: 1.1,
    conditions: ["localStorage.enabled"],
  },
  maxNumberMessages: {
    title: "Maximum stored messages",
    type: "number",
    default: 20,
    description:
      "Maximum number of messages to retain in localStorage. When this limit is reached, oldest messages are automatically removed.",
    index: 2,
    conditions: ["localStorage.enabled"],
  },
};

export const initialization: Initialization = {
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

export const preferences: Preferences = {
  messages: {
    hideIfNoMessages: {
      title: "Hide empty message container",
      type: "boolean",
      default: true,
      description:
        "Hide the messages container when there are no messages to display. Useful for cleaner UI when chat is first loaded.",
      index: 20,
    },
    clearOnNewRequest: {
      title: "Clear messages on new request",
      type: "boolean",
      default: false,
      description:
        "When enabled, clears previous conversation history each time the user sends a new message. Creates a fresh context for each new user input.",
      index: 21,
    },
    parseBotResponsesMarkdown: {
      title: "Enable Markdown in bot responses",
      type: "boolean",
      default: true,
      description:
        "When enabled, bot responses containing Markdown are rendered as HTML with proper formatting (including code syntax highlighting, LaTeX, and MathML support). When disabled, responses are shown as plain text.",
      index: 22,
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
        title: "Show sources",
        type: "boolean",
        default: true,
        description:
          "Display source references for RAG (Retrieval-Augmented Generation) responses. Sources appear as footnotes below the bot's answer.",
        index: 50,
      },
      requireSourcesContent: {
        title: "Include source content",
        type: "boolean",
        default: false,
        description:
          "When enabled, retrieves and displays the actual content of source documents in addition to just the titles/links. Increases API load but provides more context.",
        index: 51,
        conditions: ["preferences.messages.footNotes.display"],
      },
      parseContentMarkdown: {
        title: "Format source content",
        type: "boolean",
        default: true,
        description:
          "Apply Markdown formatting to source document content when requireSourcesContent is enabled. Converts Markdown to HTML with syntax highlighting.",
        index: 52,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
        ],
      },
      clampSourceContent: {
        title: "Truncate source content",
        type: "boolean",
        default: true,
        description:
          "Limit the displayed length of source document content to prevent overly long footnotes. The actual number of lines is controlled by clampSourceContentNbLines.",
        index: 53,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
        ],
      },
      clampSourceContentNbLines: {
        title: "Source content line limit",
        type: "number",
        default: 2,
        description:
          "Maximum number of lines to display for each source document when clampSourceContent is enabled. Set to 0 to show complete content.",
        index: 54,
        conditions: [
          "preferences.messages.footNotes.display",
          "preferences.messages.footNotes.requireSourcesContent",
          "preferences.messages.footNotes.clampSourceContent",
        ],
      },
      displayOnMessageSide: {
        title: "Side panel for sources",
        type: "boolean",
        default: false,
        description:
          "Display sources in a side panel next to the message instead of below it. Provides better separation between answer and sources but requires more horizontal space.",
        index: 55,
        conditions: ["preferences.messages.footNotes.display"],
      },
      condensedDisplay: {
        title: "Compact source links",
        type: "boolean",
        default: false,
        description:
          "Display source links as numbered references only (without titles). More compact but less informative. Has no effect when requireSourcesContent is enabled.",
        index: 56,
        conditions: [
          "preferences.messages.footNotes.display",
          "!preferences.messages.footNotes.requireSourcesContent",
        ],
      },
    },
    feedback: {
      enabled: {
        title: "Enable feedback buttons",
        type: "boolean",
        default: false,
        description:
          "Show thumbs up/down buttons below bot messages to allow users to provide feedback on response quality.",
        index: 23,
      },
      thumbsUpIcon: {
        title: "Thumbs up icon",
        type: "string",
        default: "bi bi-hand-thumbs-up",
        description:
          "CSS class for the thumbs-up icon. Uses Bootstrap Icons by default. Can be replaced with any icon library class.",
        index: 23.2,
      },
      thumbsDownIcon: {
        title: "Thumbs down icon",
        type: "string",
        default: "bi bi-hand-thumbs-down",
        description:
          "CSS class for the thumbs-down icon. Uses Bootstrap Icons by default. Can be replaced with any icon library class.",
        index: 23.3,
      },
    },
  },
  questionBar: {
    clearTypedCharsOnSubmit: {
      title: "Clear input on submit",
      type: "boolean",
      default: true,
      description:
        "Clear the input field after the user submits a message. When disabled, the submitted text remains in the input field for potential editing.",
      index: 60,
    },
    maxUserInputLength: {
      title: "Maximum input length",
      type: "number",
      default: 500,
      description:
        "Maximum number of characters allowed in user messages. Longer messages are truncated to this limit before being sent to the bot.",
      index: 61,
    },
    clearHistory: {
      display: {
        title: "Show clear history button",
        type: "boolean",
        default: true,
        description:
          "Display a button that allows users to clear the current conversation history and start fresh.",
        index: 70,
      },
      icon: {
        title: "Clear history icon",
        type: "string",
        default: "bi bi-trash-fill",
        description:
          "CSS class for the clear history icon. Uses Bootstrap Icons by default. Only displayed if no custom image is provided.",
        index: 71,
        conditions: ["preferences.questionBar.clearHistory.display"],
      },
      image: {
        title: "Clear history image",
        type: "ImageDef",
        default: undefined,
        description:
          "Custom image for the clear history button. Overrides the default icon if provided.",
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
          "CSS class for the submit button icon. Uses Bootstrap Icons by default. Only displayed if no custom image is provided.",
        index: 80,
      },
      image: {
        title: "Submit button image",
        type: "ImageDef",
        default: undefined,
        description:
          "Custom image for the submit button. Overrides the default icon if provided.",
        index: 81,
      },
    },
  },
};

export const wording: Wording = {
  messages: {
    message: {
      header: {
        labelUser: {
          title: "User message label",
          type: "string",
          default: "You",
          description:
            "Label displayed next to user messages in the conversation header.",
        },
        labelBot: {
          title: "Bot message label",
          type: "string",
          default: "Bot",
          description:
            "Label displayed next to bot messages in the conversation header.",
        },
      },
      footnotes: {
        sources: {
          title: "Sources label",
          type: "string",
          default: "Sources:",
          description: "Label prefix for the list of sources in RAG responses.",
        },
        showMoreLink: {
          title: "Show more text",
          type: "string",
          default: "> Show more",
          description:
            "Text for the link that expands truncated source content.",
        },
      },
    },
    feedback: {
      confirmationMessage: {
        title: "Feedback confirmation",
        type: "string",
        default: "Thank you for your feedback!",
        description:
          "Message shown to user after successfully submitting feedback.",
      },
      errorMessage: {
        title: "Feedback error message",
        type: "string",
        default:
          "An error occurred while submitting your feedback. Please try again later.",
        description: "Message shown to user if feedback submission fails.",
      },
      thumbsUpTitle: {
        title: "Thumbs up tooltip",
        type: "string",
        default: "I like this answer",
        description:
          "Tooltip text displayed when hovering over the thumbs-up button.",
      },
      thumbsDownTitle: {
        title: "Thumbs down tooltip",
        type: "string",
        default: "I don't like this answer",
        description:
          "Tooltip text displayed when hovering over the thumbs-down button.",
      },
      thumbsUpAriaLabel: {
        title: "Thumbs up ARIA label",
        type: "string",
        default: "Thumbs up feedback button",
        description:
          "Accessibility label for the thumbs-up button for screen readers.",
      },
      thumbsDownAriaLabel: {
        title: "Thumbs down ARIA label",
        type: "string",
        default: "Thumbs down feedback button",
        description:
          "Accessibility label for the thumbs-down button for screen readers.",
      },
    },
  },
  questionBar: {
    clearHistory: {
      title: "Clear history button text",
      type: "string",
      default: "",
      description:
        "Text label for the clear history button. Leave empty to use icon only.",
    },
    clearHistoryTitle: {
      title: "Clear history tooltip",
      type: "string",
      default: "Clear discussion and history",
      description:
        "Tooltip text displayed when hovering over the clear history button.",
    },
    clearHistoryAriaLabel: {
      title: "Clear history ARIA label",
      type: "string",
      default: "Clear discussion and history button",
      description:
        "Accessibility label for the clear history button for screen readers.",
    },
    input: {
      placeholder: {
        title: "Input placeholder",
        type: "string",
        default: "Ask me a question...",
        description:
          "Placeholder text shown in the input field when empty. Guides users on what to type.",
      },
    },
    submit: {
      title: "Submit button text",
      type: "string",
      default: "",
      description:
        "Text label for the submit button. Leave empty to use icon only.",
    },
    submitAriaLabel: {
      title: "Submit button ARIA label",
      type: "string",
      default: "Submit button",
      description:
        "Accessibility label for the submit button for screen readers.",
    },
  },
  connectionErrorMessage: {
    title: "Connection error message",
    type: "string",
    default: "An unexpected error occurred. Please try again later.",
    description:
      "Message displayed to users when the connection to the bot service fails.",
  },
};

export const appOptionsModel: AppOptionsModel = {
  localStorage: localStorage,
  initialization: initialization,
  preferences: preferences,
  wording: wording,
};
