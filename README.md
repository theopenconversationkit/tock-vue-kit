# Tock Vue Kit

A Vue 3 toolkit to easily embed [Tock](https://doc.tock.ai) into web pages or web apps.

## Demo

Try the Tock Vue Kit (and the Tock Vue Kit Editor) on the [demo page](https://doc.tock.ai/tock-vue-kit/)

## Prerequisites

Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/)

## Quick Start

```bash
npm install tock-vue-kit
```

Include js and css files :

```html
<script src="https://unpkg.com/vue@3.4"></script>
<link href="dist/style.css" rel="stylesheet" />
<script src="dist/tock-vue-kit.umd.cjs"></script>
```

Display chat app in desired target :

```html
<div id="chat-wrapper"></div>

<script>
  TockVueKit.renderChat(
    document.getElementById("chat-wrapper"),
    "<TOCK_BOT_API_URL>"
  );
</script>
```

## Render method options

TockVueKit.renderChat([element](#element),[tockBotApiUrl](#tockBotApiUrl),[customizationOptions](#customizationOptions))

#### element

The first argument of _TockVueKit.renderChat_ method is the element where to render the widget. The element must be present in the document and provided as a _HTMLElement_ reference.

#### tockBotApiUrl

The second argument is the url of the Tock instance to communicate with. This can be found in Tock Studio in Settings > Configurations, _Relative REST path_ field (add the hosting domain of the Tock instance before the given path).

#### customizationOptions

The third argument hosts the widget's customization options. See below.

## Customization options

Customization options are functional options of the widget. For visual widget customization, see [Visual customization](#Visual-customization) below.
Customization options are provided in the form of an object that can contain the following optional attributes:

- [LocalStorage](#LocalStorage);
- [Initialization](#Initialization);
- [Preferences](#Preferences);
- [Wording](#Wording);

[Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) offers an easy way to define customization options (See [demo page](https://doc.tock.ai/tock-vue-kit/) to get an idea)

### LocalStorage

Optional options relating to the persistence in _localStorage_ of messages exchanged by the user with the Tock instance :

| Property name     | Description                                                                                                      | Default   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | --------- |
| enabled           | Retain conversation history in local storage                                                                     | False     |
| prefix            | Prefix for local storage keys allowing communication with different bots from the same domain                    | undefined |
| maxNumberMessages | Maximum number of messages to store in local storage. Passing this limit, older messages are removed of history. | 20        |

Exemple :

```Javascript
TockVueKit.renderChat(
  document.getElementById("<TARGET_ELEMENT_ID>"),
  "<TOCK_BOT_API_URL>",
  {
    localStorage : {
      enabled : true,
      prefix : 'myprefix',
      maxNumberMessages : 15
    }
  }
);
```

### Initialization

| Property name  | Description                                                                                                                                                                | Default   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| extraHeaders   | Additional HTTP header key/value pairs to be supplied in requests. Warning : Tock server configuration required.                                                           | undefined |
| welcomeMessage | Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.                                    | undefined |
| openingMessage | Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any. | undefined |

Exemple :

```Javascript
TockVueKit.renderChat(
  document.getElementById("<TARGET_ELEMENT_ID>"),
  "<TOCK_BOT_API_URL>",
  {
    "initialization": {
      "extraHeaders": {
        "my-header-name": "My header value",
        "other-header-name": "other header value"
      },
      "welcomeMessage": "Hi, how can i help you today ?"
    }
  }
)
```

### Preferences

| Property name | Description                 | Default |
| ------------- | --------------------------- | ------- |
| messages      | [Messages](#Messages)       |         |
| questionBar   | [QuestionBar](#QuestionBar) |         |

#### Messages

| Property name     | Description                                                        | Default |
| ----------------- | ------------------------------------------------------------------ | ------- |
| hideIfNoMessages  | Hide messages container if there is no messages to display.        | true    |
| clearOnNewRequest | If true, deletes previous messages when a new user request is sent | false   |
| message           | [Message](#Message)                                                |         |
| footNotes         | [FootNotes](#FootNotes)                                            |         |

##### Message

| Property name    | Description                               | Default |
| ---------------- | ----------------------------------------- | ------- |
| hideUserMessages | If true, user messages are not displayed. | false   |
| header           | [Header](#Header)                         |         |

###### Header

| Property name | Description                     | Default |
| ------------- | ------------------------------- | ------- |
| display       | Display a header above message. | true    |
| avatar        | [Avatar](#Avatar)               |         |

###### Avatar

| Property name | Description                                                                       | Default           |
| ------------- | --------------------------------------------------------------------------------- | ----------------- |
| display       | Display an avatar in message header.                                              | true              |
| userIcon      | Class name of the user avatar icon (displayed only if User image is not defined). | bi bi-person-fill |
| userImage     | Image of the user avatar. Type : [ImageDef](#ImageDef)                            | undefined         |
| botIcon       | Class name of the bot avatar icon (displayed only if Bot image is not defined).   | bi bi-robot       |
| botImage      | Image of the bot avatar.Type : [ImageDef](#ImageDef)                              | undefined         |
| label         | [Label](#Label)                                                                   |                   |

####### Label

| Property name | Description                                                                                                                                        | Default |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| display       | Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content). | true    |

##### ImageDef

##### FootNotes

Wip

#### QuestionBar

Wip

### Wording

Wip

## Visual customization

Wip
