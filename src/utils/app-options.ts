import type { appOptions } from "@/models/app-options";
import { mergeDeep } from "@/utils/deep-merge";

const defaultAppOptions: appOptions = {
  localStorage: {
    enabled: false,
    maxNumberMessages: 20,
  },
  preferences: {
    messages: {
      clearOnNewRequest: false,
      message: {
        header: {
          display: true,
          avatar: {
            display: true,
            userIcon: "bi bi-person-fill",
            botIcon: "bi bi-robot",
          },
          label: {
            display: true,
          },
        },
      },
    },
    questionBar: {
      maxUserInputLength: 500,
      clearHistory: {
        display: true,
        icon: "bi bi-trash-fill",
      },
      submit: {
        icon: "bi bi-send-fill",
      },
    },
  },
  wording: {
    messages: {
      message: {
        header: {
          labelUser: "You",
          labelBot: "Bot",
        },
        footnotes: {
          sources: "Sources :",
        },
      },
    },
    questionBar: {
      clearHistory: {
        labelBefore: "",
        labelAfter: "",
      },
      input: {
        placeholder: "Ask me a question...",
      },
      submit: {
        labelBefore: "",
        labelAfter: "",
      },
    },
  },
};

class appOptionsSingleton {
  private static instance: appOptionsSingleton | undefined;

  options: appOptions;

  constructor(options: Partial<appOptions>) {
    this.options = mergeDeep(
      JSON.parse(JSON.stringify(defaultAppOptions)),
      options
    );
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

export default appOptionsSingleton;
