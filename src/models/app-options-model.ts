export interface ImageDef {
  src: string;
  width: string;
  height: string;
}

export interface KeyValues {
  [key: string]: string;
}

export interface OptionDefinition<T> {
  title: string;
  type: "boolean" | "string" | "number" | "ImageDef" | "KeyValues";
  default: T | undefined;
  description: string | undefined;
  index?: number;
  conditions?: string[];
}

export interface LocalStorage {
  enabled: OptionDefinition<boolean>;
  maxNumberMessages: OptionDefinition<number>;
  prefix: OptionDefinition<string>;
}

export interface Initialization {
  welcomeMessage: OptionDefinition<string>;
  openingMessage: OptionDefinition<string>;
  extraHeaders: OptionDefinition<KeyValues>;
}

export interface Preferences {
  messages: {
    clearOnNewRequest: OptionDefinition<boolean>;
    hideIfNoMessages: OptionDefinition<boolean>;
    parseBotResponsesMarkdown: OptionDefinition<boolean>;

    message: {
      hideUserMessages: OptionDefinition<boolean>;
      header: {
        display: OptionDefinition<boolean>;
        avatar: {
          display: OptionDefinition<boolean>;
          userIcon: OptionDefinition<string>;
          userImage: OptionDefinition<ImageDef>;
          botIcon: OptionDefinition<string>;
          botImage: OptionDefinition<ImageDef>;
        };
        label: {
          display: OptionDefinition<boolean>;
        };
      };
    };
    footNotes: {
      display: OptionDefinition<boolean>;
      requireSourcesContent: OptionDefinition<boolean>;
      parseContentMarkdown: OptionDefinition<boolean>;
      clampSourceContent: OptionDefinition<boolean>;
      clampSourceContentNbLines: OptionDefinition<number>;
      displayOnMessageSide: OptionDefinition<boolean>;
      condensedDisplay: OptionDefinition<boolean>;
    };
  };
  questionBar: {
    clearTypedCharsOnSubmit: OptionDefinition<boolean>;
    maxUserInputLength: OptionDefinition<number>;
    clearHistory: {
      display: OptionDefinition<boolean>;
      icon: OptionDefinition<string>;
      image: OptionDefinition<ImageDef>;
    };
    submit: {
      icon: OptionDefinition<string>;
      image: OptionDefinition<ImageDef>;
    };
  };
}

export interface Wording {
  messages: {
    message: {
      header: {
        labelUser: OptionDefinition<string>;
        labelBot: OptionDefinition<string>;
      };
      footnotes: {
        sources: OptionDefinition<string>;
        showMoreLink: OptionDefinition<string>;
      };
    };
  };
  questionBar: {
    clearHistory: OptionDefinition<string>;
    clearHistoryAriaLabel: OptionDefinition<string>;
    input: {
      placeholder: OptionDefinition<string>;
    };
    submit: OptionDefinition<string>;
    submitAriaLabel: OptionDefinition<string>;
  };
  connectionErrorMessage: OptionDefinition<string>;
}

export interface AppOptionsModel {
  localStorage: LocalStorage;
  initialization: Initialization;
  preferences: Preferences;
  wording: Wording;
}

type FlattenAppOptionsModel<T> = {
  [K in keyof T]: T[K] extends OptionDefinition<infer G>
    ? G
    : FlattenAppOptionsModel<T[K]>;
};

export interface AppOptions extends FlattenAppOptionsModel<AppOptionsModel> {}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
