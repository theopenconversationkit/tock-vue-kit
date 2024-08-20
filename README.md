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
<link href="dist/style.css" rel="stylesheet" />
<script src="https://unpkg.com/vue@3.4"></script>
<script src="dist/tock-vue-kit.umd.cjs"></script>
```

Display the chat widget in desired target :

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

> TockVueKit.renderChat([element](#element),[tockBotApiUrl](#tockBotApiUrl),[customizationOptions](#customizationOptions))

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

> [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) offers an easy way to define customization options (See [demo page](https://doc.tock.ai/tock-vue-kit/), click _Editor_ switch then see _Preferences_ and _Wording_ tabs)

### LocalStorage

Optional options relating to the persistence in _localStorage_ of messages exchanged by the user with the Tock instance :

| Property name     | Description                                                                                                      | Type    | Default   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | --------- |
| enabled           | Retain conversation history in local storage                                                                     | Boolean | False     |
| prefix            | Prefix for local storage keys allowing communication with different bots from the same domain                    | String  | undefined |
| maxNumberMessages | Maximum number of messages to store in local storage. Passing this limit, older messages are removed of history. | Integer | 20        |

Example :

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

| Property name  | Description                                                                                                                                                                | Type            | Default   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------- |
| extraHeaders   | Additional HTTP header key/value pairs to be supplied in requests. Warning : Tock server configuration required.                                                           | Key/Value pairs | undefined |
| welcomeMessage | Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.                                    | String          | undefined |
| openingMessage | Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any. | String          | undefined |

Example :

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

| Property name | Description             | Type                        | Default |
| ------------- | ----------------------- | --------------------------- | ------- |
| messages      | Messages options        | [Messages](#Messages)       |         |
| questionBar   | User input area options | [QuestionBar](#QuestionBar) |         |

#### Messages

| Property name     | Description                                                        | Type                    | Default |
| ----------------- | ------------------------------------------------------------------ | ----------------------- | ------- |
| hideIfNoMessages  | Hide messages container if there is no messages to display.        | Boolean                 | true    |
| clearOnNewRequest | If true, deletes previous messages when a new user request is sent | Boolean                 | false   |
| message           | Message options                                                    | [Message](#Message)     |         |
| footNotes         | Footnotes options                                                  | [FootNotes](#FootNotes) |         |

##### Message

| Property name    | Description                               | Type              | Default |
| ---------------- | ----------------------------------------- | ----------------- | ------- |
| hideUserMessages | If true, user messages are not displayed. | Boolean           | false   |
| header           | Message header options                    | [Header](#Header) |         |

###### Header

| Property name | Description                     | Type              | Default |
| ------------- | ------------------------------- | ----------------- | ------- |
| display       | Display a header above message. | Boolean           | true    |
| avatar        | Message header avatar options   | [Avatar](#Avatar) |         |
| label         | Message header label options    | [Label](#Label)   |         |

###### Avatar

| Property name | Description                                                                       | Type                  | Default           |
| ------------- | --------------------------------------------------------------------------------- | --------------------- | ----------------- |
| display       | Display an avatar in message header.                                              | Boolean               | true              |
| userIcon      | Class name of the user avatar icon (displayed only if User image is not defined). | String                | bi bi-person-fill |
| userImage     | Image of the user avatar.                                                         | [ImageDef](#ImageDef) | undefined         |
| botIcon       | Class name of the bot avatar icon (displayed only if Bot image is not defined).   | String                | bi bi-robot       |
| botImage      | Image of the bot avatar.                                                          | [ImageDef](#ImageDef) | undefined         |

###### Label

| Property name | Description                                                                                                                                        | Type    | Default |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| display       | Display a label in message header (cf wording.messages.message.header.labelUser and wording.messages.message.header.labelBot for textual content). | Boolean | true    |

##### FootNotes

Footnotes can optionally be added to Rag messages.

| Property name             | Description                                                                                                                   | Type    | Default |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| display                   | For RAG responses, display the sources used to generate the answer if any.                                                    | Boolean | true    |
| requireSourcesContent     | For RAG responses, request the textual content of the source in addition to the source title and link.                        | Boolean | false   |
| clampSourceContent        | For RAG responses with sources content, truncate the textual source content.                                                  | Boolean | true    |
| clampSourceContentNbLines | For RAG responses with sources content, number of lines after which to truncate text.                                         | Integer | 2       |
| displayOnMessageSide      | For RAG responses, any sources are displayed on one side of the message response rather than directly following the response. | Boolean | false   |

#### QuestionBar

| Property name           | Description                                                          | Type                          | Default |
| ----------------------- | -------------------------------------------------------------------- | ----------------------------- | ------- |
| clearTypedCharsOnSubmit | Whether or not the question input field should be cleared on submit. | Boolean                       | true    |
| maxUserInputLength      | Max length of the user input message string                          | Integer                       | 500     |
| clearHistory            | Options of clear hitsory button                                      | [clearHistory](#clearHistory) |         |
| submit                  | Options of submit button                                             | [submit](#submit)             |         |

##### clearHistory

| Property name | Description                                                                          | Type                  | Default          |
| ------------- | ------------------------------------------------------------------------------------ | --------------------- | ---------------- |
| display       | Show the clear discussion and history button                                         | Boolean               | true             |
| icon          | Class name of the clear history control icon (displayed only if no image is defined) | String                | bi bi-trash-fill |
| image         | Image of the clearHistory control                                                    | [ImageDef](#ImageDef) | undefined        |

##### submit

| Property name | Description                                                                   | Type                  | Default         |
| ------------- | ----------------------------------------------------------------------------- | --------------------- | --------------- |
| icon          | Class name of the submit control icon (displayed only if no image is defined) | String                | bi bi-send-fill |
| image         | Image of the submit control                                                   | [ImageDef](#ImageDef) | undefined       |

### ImageDef

Option object for providing images references.

| Property name | Description                              | Type   |
| ------------- | ---------------------------------------- | ------ |
| width         | Width in which to display the image.     | String |
| height        | Height in which to display the image.    | String |
| src           | Src of the image (url or svg data image) | String |

Example :

```Javascript
TockVueKit.renderChat(
  document.getElementById("<TARGET_ELEMENT_ID>"),
  "<TOCK_BOT_API_URL>",
  {
    "preferences": {
      "messages": {
        "hideIfNoMessages": false,
        "message": {
          "header": {
            "avatar": {
              "userImage": {
                "src": "https://my-url.com/my-file.png",
                "width": "1em",
                "height": "1em"
              }
            },
            "label": {
              "display": false
            }
          }
        },
        "footNotes": {
          "requireSourcesContent": true,
          "clampSourceContentNbLines": "4"
        }
      },
      "questionBar": {
        "submit": {
          "icon": "bi bi-arrow-right-circle-fill"
        }
      }
    }
  }
)
```

### Wording

The _Wording_ customization option lets you redefine all or part of the text displayed by the widget.

| Property name          | Description              | Type                          | Default                                              |
| ---------------------- | ------------------------ | ----------------------------- | ---------------------------------------------------- |
| messages               | Messages wording         | [Messages](#Messages-1)       |                                                      |
| questionBar            | User input area wording  | [QuestionBar](#QuestionBar-1) |                                                      |
| connectionErrorMessage | Connection error message | String                        | An unexpected error occured. Please try again later. |

#### Messages

| Property name | Description     | Type                  |
| ------------- | --------------- | --------------------- |
| message       | Message wording | [Message](#Message-1) |

##### Message

| Property name | Description               | Type                      |
| ------------- | ------------------------- | ------------------------- |
| header        | Message header wording    | [Header](#Header-1)       |
| footnotes     | Message footnotes wording | [Footnotes](#Footnotes-1) |

###### Header

| Property name | Description               | Type   | Default |
| ------------- | ------------------------- | ------ | ------- |
| labelUser     | Message header user label | String | You     |
| labelBot      | Message header bot label  | String | Bot     |

###### Footnotes

| Property name | Description          | Type   | Default     |
| ------------- | -------------------- | ------ | ----------- |
| sources       | Footnotes label      | String | Sources:    |
| showMoreLink  | Show more link label | String | > Show more |

#### QuestionBar

| Property name         | Description                     | Type            | Default                             |
| --------------------- | ------------------------------- | --------------- | ----------------------------------- |
| clearHistory          | Clear history button label      | String          |                                     |
| clearHistoryAriaLabel | Clear history button Aria label | String          | Clear discussion and history button |
| submit                | Submit button label             | String          |                                     |
| submitAriaLabel       | Submit button Aria label        | String          | Submit button                       |
| input                 | Input field wording             | [Input](#Input) |                                     |

##### Input

| Property name | Description            | Type   | Default              |
| ------------- | ---------------------- | ------ | -------------------- |
| placeholder   | User input placeholder | String | Ask me a question... |

## Visual customization

Most of the css rules that shape the widget are defined by css variables.

Each of these variables has a default value, which you are free to redefine according to your needs. Use your DevTools to identify the variables to overload or take a look at the [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) via its [demo page](https://doc.tock.ai/tock-vue-kit/).
The css variables are prefixed with the string “--tvk” so as not to unintentionally impact the page hosting the widget.

You can redefine the desired css variables in a number of ways:

### Visual customization in source

Redefine desired css variables in the source of the page hosting the widget, anywhere after inclusion of the css file.

Example :

```Html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Website</title>
    <script src="https://unpkg.com/vue@3.4"></script>
    <script src="dist/tock-vue-kit.umd.cjs"></script>
    <link href="dist/style.css" rel="stylesheet" />
    <style>
      :root {
        --tvk_colors_brand-hue: 214;
        --tvk_colors_brand-lightness: 42%;
        --tvk_colors_brand-saturation: 40%;
        --tvk_colors_dark_neutral: white;
        --tvk_colors_dark_text1: white;
        --tvk_colors_dark_text2: white;
        --tvk_wrapper_height: calc(98vh - 6em);
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Welcome to My Website</h1>
      <div id="chat-wrapper"></div>
    </main>

    <script>
      TockVueKit.renderChat(
        document.getElementById("chat-wrapper"),
        "<TOCK_BOT_API_URL>"
      );
    </script>
  </body>
</html>

```

### Visual customization in a separate css file

Create a separate css file where you redefine css variables and include this file in source, after inclusion of main css file.

Example :

Main html page

```Html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Website</title>
    <script src="https://unpkg.com/vue@3.4"></script>
    <script src="dist/tock-vue-kit.umd.cjs"></script>
    <link href="dist/style.css" rel="stylesheet" />
    <link href="my-visual-customization.css" rel="stylesheet" />
  </head>
  <body>
    <main>
      <h1>Welcome to My Website</h1>
      <div id="chat-wrapper"></div>
    </main>

    <script>
      TockVueKit.renderChat(
        document.getElementById("chat-wrapper"),
        "<TOCK_BOT_API_URL>"
      );
    </script>
  </body>
</html>

```

Separate customization file (my-visual-customization.css in this example)

```Css
:root {
  --tvk_colors_brand-hue: 214;
  --tvk_colors_brand-lightness: 42%;
  --tvk_colors_brand-saturation: 40%;
  --tvk_colors_dark_neutral: white;
  --tvk_colors_dark_text1: white;
  --tvk_colors_dark_text2: white;
  --tvk_wrapper_height: calc(98vh - 6em);
}

```

### Visual customization with javascript

If necessary, you can inject css variable overloads with javascript at runtime.

Example :

```Html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Website</title>
    <script src="https://unpkg.com/vue@3.4"></script>
    <link href="dist/style.css" rel="stylesheet" />
    <script src="dist/tock-vue-kit.umd.cjs"></script>
  </head>
  <body>
    <main>
      <h1>Welcome to My Website</h1>
      <div id="chat-wrapper"></div>
    </main>

    <script>
      TockVueKit.renderChat(
        document.getElementById("chat-wrapper"),
        "<TOCK_BOT_API_URL>"
      );

      const styling = {
        "--tvk_colors_brand-hue": "214",
        "--tvk_colors_brand-lightness": "42%",
        "--tvk_colors_brand-saturation": "40%",
        "--tvk_colors_dark_background":
          "hsl(var(--tvk_colors_brand-hue) 50% 20%)",
        "--tvk_colors_dark_neutral": "white",
        "--tvk_colors_dark_text1": "white",
        "--tvk_colors_dark_text2": "white",
        "--tvk_colors_light_background":
          "hsl(var(--tvk_colors_brand-hue) 50% 90%)",
        "--tvk_wrapper_height": "calc(98vh - 6em)",
      };

      let root = document.documentElement;
      Object.entries(styling).forEach((style) => {
        root.style.setProperty(style[0], style[1]);
      });
    </script>
  </body>
</html>

```

### More advanced visual customization

If you need to modify the widget's appearance in greater depth, use your own version of the "dist/style.css" file, which you can then customize as you see fit.

> [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) offers an easy way to define and export css variables customization (See [demo page](https://doc.tock.ai/tock-vue-kit/), click _Editor_ switch then see _Styling_ and _Output_ tabs)

### About colors

The Tock Vue Kit supports light and dark modes out of the box.
Based on the three HSL variables (--tvk_colors_brand-hue, --tvk_colors_brand-lightness and --tvk_colors_brand-saturation), two sets of color variables (light and dark) are defined. The variables in each of these two sets contain the discriminants light or dark in their names, enabling the colors for each mode to be defined easily and independently (--tvk_colors_light_text1 | --tvk_colors_dark_text1, --tvk_colors_light_surface1 | --tvk_colors_dark_surface1, etc.). These are automatically mapped to their non-discriminating equivalent (--tvk_colors_text1, --tvk_colors_surface1, etc.) according to the state of the “data-theme” (or “data-bs-theme”) body attribute. Wherever color variables are referenced, the non-discriminant versions are used. This makes it possible to switch seamlessly between light and dark modes.
Take a look at the [demo page](https://doc.tock.ai/tock-vue-kit/) of the [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) to better understand this mechanism.
