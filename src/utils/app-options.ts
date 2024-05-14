import type { appOptions } from "@/models/app-options";
import { mergeDeep } from "@/utils/deep-merge";
import { isObject } from "./misc";

export interface optionDefinition {
  type: "boolean" | "string" | "number" | "imageDef";
  default: boolean | string | number | undefined;
  title: string;
  description: string | undefined;
}

export interface AppOptionsModel {
  [key: string]: AppOptionsModel | optionDefinition;
}

export const AppOptionsModel: AppOptionsModel = {
  localStorage: {
    enabled: {
      type: "boolean",
      default: false,
      title: "Local storage",
      description: "Retain conversation history in local storage",
    },
    maxNumberMessages: {
      type: "number",
      default: 20,
      title: "Maximum messages",
      description: "Maximum number of messages to store in local storage",
    },
    prefix: {
      type: "string",
      default: undefined,
      title: "Local storage prefix",
      description:
        "Prefix for local storage keys allowing communication with different bots from the same domain",
    },
  },
  initialization: {
    welcomeMessage: {
      type: "string",
      default: undefined,
      title: "Welcome message",
      description:
        "Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.",
    },
    openingMessage: {
      type: "string",
      default: undefined,
      title: "Opening message",
      description:
        "Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any.",
    },
  },
  preferences: {
    messages: {
      clearOnNewRequest: {
        type: "boolean",
        default: false,
        title: "Clear on new message",
        description:
          "If true, deletes previous messages when a new user request is sent",
      },
      hideIfNoMessages: {
        type: "boolean",
        default: true,
        title: "Hide messages if no messages",
        description:
          "Hide messages container if there is no messages to display.",
      },
      message: {
        hideUserMessages: {
          type: "boolean",
          default: false,
          title: "Hide user messages",
          description: "If true, user messages are not displayed.",
        },
        header: {
          display: {
            type: "boolean",
            default: true,
            title: "Display header",
            description: "Display a header above message.",
          },
          avatar: {
            display: {
              type: "boolean",
              default: true,
              title: "Display header avatar",
              description: "Display an avatar in message header.",
            },
            userIcon: {
              type: "string",
              default: "bi bi-person-fill",
              title: "User icon",
              description:
                "Class name of the user avatar icon (displayed only if User image is not defined).",
            },
            userImage: {
              type: "imageDef",
              default: undefined,
              title: "User image",
              description: "Image of the user avatar",
            },
            botIcon: {
              type: "string",
              default: "bi bi-robot",
              title: "Bot icon",
              description:
                "Class name of the bot avatar icon (displayed only if Bot image is not defined).",
            },
            botImage: {
              type: "imageDef",
              default: undefined,
              title: "Bot image",
              description: "Image of the bot avatar",
            },
          },
          label: {
            display: {
              type: "boolean",
              default: true,
              title: "Display header label",
              description:
                "Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content).",
            },
          },
        },
      },
      footNotes: {
        requireSourcesContent: {
          type: "boolean",
          default: false,
          title: "Request textual content of sources",
          description:
            "For RAG answers, request the textual content of the source in addition to the source title and link.",
        },
      },
    },
    questionBar: {
      clearTypedCharsOnSubmit: {
        type: "boolean",
        default: true,
        title: "Clear input on submit",
        description:
          "Whether or not the question input should be cleared on submit.",
      },
      maxUserInputLength: {
        type: "number",
        default: 500,
        title: "Max user message length",
        description: "Max length of the user input message string",
      },
      clearHistory: {
        display: {
          type: "boolean",
          default: true,
          title: "Show clear history button",
          description:
            "Display the control allowing user to clear discussion history and local storage history, if any",
        },
        icon: {
          type: "string",
          default: "bi bi-trash-fill",
          title: "Clear history button icon",
          description:
            "Class name of the clear history control icon (displayed only if no image is defined)",
        },
        image: {
          type: "imageDef",
          default: undefined,
          title: "Clear history button image",
          description: "Image of the clearHistory control",
        },
      },
      submit: {
        icon: {
          type: "string",
          default: "bi bi-send-fill",
          title: "Submit button icon",
          description:
            "Class name of the submit control icon (displayed only if no image is defined)",
        },
        image: {
          type: "imageDef",
          default: undefined,
          title: "Submit button image",
          description: "Image of the submit control",
        },
      },
    },
  },
  wording: {
    messages: {
      message: {
        header: {
          labelUser: {
            type: "string",
            default: "You",
            title: "Message header user label",
            description: undefined,
          },
          labelBot: {
            type: "string",
            default: "Bot",
            title: "Message header bot label",
            description: undefined,
          },
        },
        footnotes: {
          sources: {
            type: "string",
            default: "Sources :",
            title: "Footnotes label",
            description: undefined,
          },
        },
      },
    },
    questionBar: {
      clearHistory: {
        type: "string",
        default: "",
        title: "Clear history button label",
        description: undefined,
      },
      clearHistoryAriaLabel: {
        type: "string",
        default: "Clear discussion and history button",
        title: "Clear history button Aria label",
        description: undefined,
      },
      input: {
        placeholder: {
          type: "string",
          default: "Ask me a question...",
          title: "User input placeholder",
          description: undefined,
        },
      },
      submit: {
        type: "string",
        default: "",
        title: "Submit button label",
        description: undefined,
      },
      submitAriaLabel: {
        type: "string",
        default: "Submit button",
        title: "Submit button Aria label",
        description: undefined,
      },
    },
  },
};

function isOptionDefinition(object: object) {
  return (
    "type" in object &&
    "default" in object &&
    "title" in object &&
    "description" in object
  );
}

function extractDefaultAppOptions(
  object: AppOptionsModel | optionDefinition,
  target: { [key: string]: any } = {}
) {
  if (isObject(object)) {
    if (isOptionDefinition(object)) {
      return object.default;
    } else {
      const entries = Object.entries(object);

      for (let i = 0; i < entries.length; i++) {
        const [objectKey, objectValue] = entries[i];
        target[objectKey] = extractDefaultAppOptions(objectValue);
      }
      return target;
    }
  }
}

export class appOptionsSingleton {
  private static instance: appOptionsSingleton | undefined;

  options: appOptions;

  constructor(options: Partial<appOptions>) {
    const defaultOptions = extractDefaultAppOptions(
      AppOptionsModel
    ) as appOptions;

    this.options = mergeDeep(defaultOptions, options);
  }

  public static clearInstance(): void {
    if (appOptionsSingleton.instance) {
      appOptionsSingleton.instance = undefined;
    }
  }

  public static getInstance(options?: appOptions): appOptionsSingleton {
    if (!appOptionsSingleton.instance) {
      appOptionsSingleton.instance = new appOptionsSingleton(options!);
    }

    return appOptionsSingleton.instance;
  }
}
