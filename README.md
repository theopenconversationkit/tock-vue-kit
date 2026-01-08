![npm version](https://img.shields.io/npm/v/tock-vue-kit)
![license](https://img.shields.io/npm/l/tock-vue-kit)

# Tock Vue Kit

**A lightweight, customizable Vue 3 chat widget for embedding [Tock](https://doc.tock.ai) AI bots into any web page or app.**

## Demo

Try the Tock Vue Kit (and the Tock Vue Kit Editor) on the [demo page](https://doc.tock.ai/tock-vue-kit/)

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/)
- **Vue.js**: v3.4+ (peer dependency)
- **Browser support**: Modern browsers (Chrome, Firefox, Safari, Edge)

### ⚠️ Note on Dependencies and `package-lock.json`

This repository **does not** include a `package-lock.json` file.
Since **Tock Vue Kit** is designed as a **widget/library** for integration into various projects, we avoid locking dependency versions to prevent conflicts with host environments.

**Key dependencies (e.g., Vue.js) are defined as [peerDependencies](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies)** and must be provided by the host project. This ensures compatibility with your existing setup.

**For users:**

- Run `npm install` to generate your own `package-lock.json` locally.
- Use `npm ci` for deterministic installations in CI/CD environments.
- Refer to the [integration examples](#quick-start) for guidance on required peer dependencies.

**For contributors:**

- The `package-lock.json` file is excluded via `.gitignore`.
- Always test your changes with `npm install` before committing.

### ⚠️ Breaking Change: Icons Dependency

**As of v2.0.0**, this widget no longer bundles or automatically loads `bootstrap-icons` via CDN.
**You must now include your preferred icon library manually in your project**:

#### **Option 1: Via CDN (Bootstrap Icons)**

Add this to your HTML `<head>`:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>
```

#### **Option 2: Via npm (Bootstrap Icons)**

Install the package:

```bash
npm install bootstrap-icons
```

Then import it in your project:

```javascript
import "bootstrap-icons/font/bootstrap-icons.css";
```

#### **Why?**

This change allows you to use **any icon library** of your choice (e.g., Font Awesome, Material Icons, etc.) instead of being locked into `bootstrap-icons`.

## Quick Start

### Simple html page integration

Include js and css files:

```html
<script src="https://unpkg.com/vue@3.4/dist/vue.global.prod.js"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/tock-vue-kit@2.0.0/dist/style.css"
/>
<link
  rel="stylesheet"
  href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
/>
<script
  crossorigin
  src="https://unpkg.com/tock-vue-kit@2.0.0/dist/tock-vue-kit.iife.js"
></script>

<!-- Next line can be omitted if no Latex formula is expected in bot responses -->
<link
  rel="stylesheet"
  href="https://unpkg.com/katex@0.16.21/dist/katex.min.css"
/>
```

Display the chat widget in desired target:

```html
<div id="chat-wrapper"></div>

<script>
  TockVueKit.renderChat(
    document.getElementById("chat-wrapper"),
    "<TOCK_BOT_API_URL>"
  );
</script>
```

#### Basic Local Testing Example

Create a simple `index.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/vue@3.4/dist/vue.global.prod.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tock-vue-kit@2.0.0/dist/style.css"
    />
    <script src="https://unpkg.com/tock-vue-kit@2.0.0/dist/tock-vue-kit.iife.js"></script>
  </head>
  <body>
    <div id="chat-wrapper"></div>
    <script>
      TockVueKit.renderChat(
        document.getElementById("chat-wrapper"),
        "https://your-tock-bot-api-url.com"
      );
    </script>
  </body>
</html>
```

### Vue3 3.4.29 integration example Install the dependency:

```bash
npm install tock-vue-kit bootstrap-icons
```

In the desired component:

```html
<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import "tock-vue-kit/dist/style.css";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { renderChat } from "tock-vue-kit";

  const chatTarget = ref<HTMLElement>();

  onMounted(() => {
    renderChat(chatTarget.value!, "<TOCK_BOT_API_URL>");
  });
</script>

<template>
  <div ref="chatTarget"></div>
</template>

<style scoped>
  /* Any scoped styling... */
</style>

<!-- Use unscoped styling to visualy customize the Tvk widget -->
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
```

If Latex formulas are expected in bot responses, include the katex css file as well.

For example, directly in the component :

```html
<style lang="scss">
  @import url("https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css");
</style>
```

Or by installing the library locally:

```bash
npm install katex
```

And then by including the css in your imports :

```bash
import "katex/dist/katex.min.css";
```

### Angular 18.1.0 integration example

Install the dependency:

```bash
npm install tock-vue-kit bootstrap-icons
```

In the desired component:

```typescript
import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { renderChat } from "tock-vue-kit";
import "tock-vue-kit/dist/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

@Component({
  selector: "app-my-component",
  standalone: true,
  template: `<div #chatTarget></div>`,
  styles: `
  :root {
    --tvk_colors_brand-hue: 214;
    --tvk_colors_brand-lightness: 42%;
    --tvk_colors_brand-saturation: 40%;
    --tvk_colors_light_background: hsl(var(--tvk_colors_brand-hue) 50% 90%);
    --tvk_colors_dark_neutral: white;
    --tvk_colors_dark_text1: white;
    --tvk_colors_dark_text2: white;
    --tvk_wrapper_height: calc(100vh - 5em);
    --tvk_wrapper_max-height: calc(100vh - 5em);
  }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class MyComponentComponent {
  @ViewChild("chatTarget") chatTarget!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    renderChat(this.chatTarget.nativeElement, "<TOCK_BOT_API_URL>");
  }
}
```

If Latex formulas are expected in bot responses, include the katex css file as well.

For example, by localy installing the katex library:

```bash
npm install katex
```

And then including katex css file in your angular.json :

```json
"projects": {
    "YOUR_PROJECT": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "styles": [
              ...
              "node_modules/katex/dist/katex.min.css"
            ],
          ...
```

### React 18.3.1 integration example

Install the dependency:

```bash
npm install tock-vue-kit bootstrap-icons
```

In a css file, define your visual customizations of the widget (styles.css by example):

```css
:root {
  --tvk_colors_brand-hue: 214;
  --tvk_colors_brand-lightness: 42%;
  --tvk_colors_brand-saturation: 40%;
  --tvk_colors_light_background: hsl(var(--tvk_colors_brand-hue) 50% 90%);
  --tvk_colors_dark_neutral: white;
  --tvk_colors_dark_text1: white;
  --tvk_colors_dark_text2: white;
  --tvk_wrapper_height: calc(100vh - 5em);
  --tvk_wrapper_max-height: calc(100vh - 5em);
}
```

Finally in the desired component:

```javascript
import { useRef, useEffect } from "react";
import { renderChat } from "tock-vue-kit";
import "tock-vue-kit/dist/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

function App() {
  const chatTarget = useRef(null);

  useEffect(() => {
    renderChat(chatTarget.current, "<TOCK_BOT_API_URL>");
  });

  return <div ref={chatTarget}></div>;
}

export default App;
```

If Latex formulas are expected in bot responses, include the katex css file as well `https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css`.

### Svelte 4.2.7 integration example

Install the dependency:

```bash
npm install tock-vue-kit bootstrap-icons
```

In the desired component:

```html
<style>
  :root {
    --tvk_colors_brand-hue: 214;
    --tvk_colors_brand-lightness: 42%;
    --tvk_colors_brand-saturation: 40%;
    --tvk_colors_light_background: hsl(var(--tvk_colors_brand-hue) 50% 90%);
    --tvk_colors_dark_neutral: white;
    --tvk_colors_dark_text1: white;
    --tvk_colors_dark_text2: white;
    --tvk_wrapper_height: calc(98vh - 6em);
  }
</style>

<script>
  import { onMount } from "svelte";
  import { renderChat } from "tock-vue-kit";
  import "tock-vue-kit/dist/style.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  /** @type {HTMLDivElement} */
  let chatTarget;

  onMount(() => {
    renderChat(chatTarget, "<TOCK_BOT_API_URL>");
  });
</script>

<div bind:this="{chatTarget}"></div>
```

If Latex formulas are expected in bot responses, include the katex css file as well `https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css`.

## Note on KaTeX Integration

To optimize the size of our library and cater to the diverse needs of our users, we have chosen not to include the KaTeX CSS by default. Since the display of LaTeX formulas is not a required feature for all users, this approach helps reduce the overall weight of the library.

If you need the LaTeX formula display functionality, you can easily include the KaTeX CSS in your project by adding the following line to your HTML file or importing it into your CSS:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
/>
```

This will enable the display of mathematical formulas while giving you control over the resources loaded in your application.

### Available Bundles

The `/dist` folder includes optimized builds for different environments:
File | Format | Usage |
|--------------------------|--------|-------------------------------------------------------------------------------------------|
| `tock-vue-kit.iife.js` | IIFE | Direct inclusion in HTML via `<script>`. Exposes `TockVueKit` globally. |
| `tock-vue-kit.umd.js` | UMD | Works with `require` (CommonJS) and `import` (ESM). Compatible with most bundlers. |
| `tock-vue-kit.js` | ESM | Modern projects (Vite, Webpack 5+, Rollup). Use with `import`. |
| `tock-vue-kit.cjs` | CJS | Node.js or legacy bundlers (Webpack 4, Browserify). Use with `require`. |
| `style.css` | CSS | Required for widget styling. Include via `<link rel="stylesheet">`. |

---

## Render method arguments

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

<!-- LOCAL_STORAGE_TABLE_START -->

## LocalStorage

Options relating to the persistence in _localStorage_ of messages exchanged by the user with the Tock instance:

| Property name     | Description                                                                                                                                                                           | Type    | Default     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| enabled           | Enable/disable persistence of conversation history in the browser's localStorage. When disabled, messages are not saved between page refreshes.                                       | boolean | `false`     |
| prefix            | Unique prefix for localStorage keys to prevent conflicts when multiple bots are used on the same domain. If undefined, a default prefix is used. (_Conditions_: localStorage.enabled) | string  | `undefined` |
| maxNumberMessages | Maximum number of messages to retain in localStorage. When this limit is reached, oldest messages are automatically removed. (_Conditions_: localStorage.enabled)                     | number  | `20`        |

<!-- LOCAL_STORAGE_TABLE_END -->

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

<!-- INITIALIZATION_TABLE_START -->

## Initialization

Parameters for the initial setup and first interactions with the bot:

| Property name  | Description                                                                                                                                                                | Type                     | Default     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| extraHeaders   | Additional HTTP header key/value pairs to be supplied in requests. Warning : Tock server configuration required.                                                           | `Record<string, string>` | `undefined` |
| welcomeMessage | Initial bot message to be displayed to the user at startup. It will not be sent to the bot and will be stored in local storage, if any.                                    | string                   | `undefined` |
| openingMessage | Initial user message to be sent to the bot at startup to trigger a welcome sequence. It will not be displayed to the user and will not be stored in local storage, if any. | string                   | `undefined` |

<!-- INITIALIZATION_TABLE_END -->

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

<!-- PREFERENCES_TABLE_START -->

## Preferences

Customization options for the chat interface and user experience:

| Property name   | Description         | Type                        | Default |
| --------------- | ------------------- | --------------------------- | ------- |
| **messages**    | Messages options    | [Messages](#Messages)       |         |
| **questionBar** | QuestionBar options | [QuestionBar](#QuestionBar) |         |

### Messages

| Property name             | Description                                                                                                                                                                                                    | Type                    | Default |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| hideIfNoMessages          | Hide the messages container when there are no messages to display. Useful for cleaner UI when chat is first loaded.                                                                                            | boolean                 | `true`  |
| clearOnNewRequest         | When enabled, clears previous conversation history each time the user sends a new message. Creates a fresh context for each new user input.                                                                    | boolean                 | `false` |
| parseBotResponsesMarkdown | When enabled, bot responses containing Markdown are rendered as HTML with proper formatting (including code syntax highlighting, LaTeX, and MathML support). When disabled, responses are shown as plain text. | boolean                 | `true`  |
| **message**               | Message options                                                                                                                                                                                                | [Message](#Message)     |         |
| **footNotes**             | FootNotes options                                                                                                                                                                                              | [FootNotes](#FootNotes) |         |
| **feedback**              | Feedback options                                                                                                                                                                                               | [Feedback](#Feedback)   |         |

#### Message

| Property name    | Description                               | Type              | Default |
| ---------------- | ----------------------------------------- | ----------------- | ------- |
| hideUserMessages | If true, user messages are not displayed. | boolean           | `false` |
| **header**       | Header options                            | [Header](#Header) |         |

##### Header

| Property name | Description                     | Type              | Default |
| ------------- | ------------------------------- | ----------------- | ------- |
| display       | Display a header above message. | boolean           | `true`  |
| **avatar**    | Avatar options                  | [Avatar](#Avatar) |         |
| **label**     | Label options                   | [Label](#Label)   |         |

#### FootNotes

| Property name             | Description                                                                                                                                                                                                                                                                                        | Type    | Default |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| display                   | Display source references for RAG (Retrieval-Augmented Generation) responses. Sources appear as footnotes below the bot's answer.                                                                                                                                                                  | boolean | `true`  |
| requireSourcesContent     | When enabled, retrieves and displays the actual content of source documents in addition to just the titles/links. Increases API load but provides more context. (_Conditions_: preferences.messages.footNotes.display)                                                                             | boolean | `false` |
| parseContentMarkdown      | Apply Markdown formatting to source document content when requireSourcesContent is enabled. Converts Markdown to HTML with syntax highlighting. (_Conditions_: preferences.messages.footNotes.display, preferences.messages.footNotes.requireSourcesContent)                                       | boolean | `true`  |
| clampSourceContent        | Limit the displayed length of source document content to prevent overly long footnotes. The actual number of lines is controlled by clampSourceContentNbLines. (_Conditions_: preferences.messages.footNotes.display, preferences.messages.footNotes.requireSourcesContent)                        | boolean | `true`  |
| clampSourceContentNbLines | Maximum number of lines to display for each source document when clampSourceContent is enabled. Set to 0 to show complete content. (_Conditions_: preferences.messages.footNotes.display, preferences.messages.footNotes.requireSourcesContent, preferences.messages.footNotes.clampSourceContent) | number  | `2`     |
| displayOnMessageSide      | Display sources in a side panel next to the message instead of below it. Provides better separation between answer and sources but requires more horizontal space. (_Conditions_: preferences.messages.footNotes.display)                                                                          | boolean | `false` |
| condensedDisplay          | Display source links as numbered references only (without titles). More compact but less informative. Has no effect when requireSourcesContent is enabled. (_Conditions_: preferences.messages.footNotes.display, !preferences.messages.footNotes.requireSourcesContent)                           | boolean | `false` |

#### Feedback

| Property name  | Description                                                                                                       | Type    | Default                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------- | ------- | ------------------------ |
| enabled        | Show thumbs up/down buttons below bot messages to allow users to provide feedback on response quality.            | boolean | `false`                  |
| thumbsUpIcon   | CSS class for the thumbs-up icon. Uses Bootstrap Icons by default. Can be replaced with any icon library class.   | string  | `bi bi-hand-thumbs-up`   |
| thumbsDownIcon | CSS class for the thumbs-down icon. Uses Bootstrap Icons by default. Can be replaced with any icon library class. | string  | `bi bi-hand-thumbs-down` |

### QuestionBar

| Property name           | Description                                                                                                                                 | Type                          | Default |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| clearTypedCharsOnSubmit | Clear the input field after the user submits a message. When disabled, the submitted text remains in the input field for potential editing. | boolean                       | `true`  |
| maxUserInputLength      | Maximum number of characters allowed in user messages. Longer messages are truncated to this limit before being sent to the bot.            | number                        | `500`   |
| **clearHistory**        | ClearHistory options                                                                                                                        | [ClearHistory](#ClearHistory) |         |
| **submit**              | Submit options                                                                                                                              | [Submit](#Submit)             |         |

#### ClearHistory

| Property name | Description                                                                                                                                                                        | Type                  | Default            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------ |
| display       | Display a button that allows users to clear the current conversation history and start fresh.                                                                                      | boolean               | `true`             |
| icon          | CSS class for the clear history icon. Uses Bootstrap Icons by default. Only displayed if no custom image is provided. (_Conditions_: preferences.questionBar.clearHistory.display) | string                | `bi bi-trash-fill` |
| image         | Custom image for the clear history button. Overrides the default icon if provided. (_Conditions_: preferences.questionBar.clearHistory.display)                                    | [ImageDef](#ImageDef) | `undefined`        |

#### Submit

| Property name | Description                                                                                                           | Type                  | Default           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------- |
| icon          | CSS class for the submit button icon. Uses Bootstrap Icons by default. Only displayed if no custom image is provided. | string                | `bi bi-send-fill` |
| image         | Custom image for the submit button. Overrides the default icon if provided.                                           | [ImageDef](#ImageDef) | `undefined`       |

<!-- PREFERENCES_TABLE_END -->

<!-- TYPES_TABLE_START -->

### Types

Complex type definitions used in the configuration:

### ImageDef

Option object for ImageDef.

| Property name | Description                              | Type   |
| ------------- | ---------------------------------------- | ------ |
| src           | Src of the image (url or svg data image) | string |
| width         | Width in which to display the image.     | string |
| height        | Height in which to display the image.    | string |

<!-- TYPES_TABLE_END -->

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

<!-- WORDING_TABLE_START -->

## Wording

Text labels and messages displayed in the interface (can be customized for internationalization):

| Property name          | Description                                                              | Type                        | Default                                                 |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------- |
| connectionErrorMessage | Message displayed to users when the connection to the bot service fails. | string                      | `An unexpected error occurred. Please try again later.` |
| **messages**           | Messages options                                                         | [Messages](#Messages)       |                                                         |
| **questionBar**        | QuestionBar options                                                      | [QuestionBar](#QuestionBar) |                                                         |

### Messages

| Property name | Description      | Type                  | Default |
| ------------- | ---------------- | --------------------- | ------- |
| **message**   | Message options  | [Message](#Message)   |         |
| **feedback**  | Feedback options | [Feedback](#Feedback) |         |

#### Message

| Property name | Description       | Type                    | Default |
| ------------- | ----------------- | ----------------------- | ------- |
| **header**    | Header options    | [Header](#Header)       |         |
| **footnotes** | Footnotes options | [Footnotes](#Footnotes) |         |

##### Header

| Property name | Description                                                       | Type   | Default |
| ------------- | ----------------------------------------------------------------- | ------ | ------- |
| labelUser     | Label displayed next to user messages in the conversation header. | string | `You`   |
| labelBot      | Label displayed next to bot messages in the conversation header.  | string | `Bot`   |

##### Footnotes

| Property name | Description                                              | Type   | Default       |
| ------------- | -------------------------------------------------------- | ------ | ------------- |
| sources       | Label prefix for the list of sources in RAG responses.   | string | `Sources:`    |
| showMoreLink  | Text for the link that expands truncated source content. | string | `> Show more` |

#### Feedback

| Property name       | Description                                                        | Type   | Default                                                                     |
| ------------------- | ------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------- |
| confirmationMessage | Message shown to user after successfully submitting feedback.      | string | `Thank you for your feedback!`                                              |
| errorMessage        | Message shown to user if feedback submission fails.                | string | `An error occurred while submitting your feedback. Please try again later.` |
| thumbsUpTitle       | Tooltip text displayed when hovering over the thumbs-up button.    | string | `I like this answer`                                                        |
| thumbsDownTitle     | Tooltip text displayed when hovering over the thumbs-down button.  | string | `I don't like this answer`                                                  |
| thumbsUpAriaLabel   | Accessibility label for the thumbs-up button for screen readers.   | string | `Thumbs up feedback button`                                                 |
| thumbsDownAriaLabel | Accessibility label for the thumbs-down button for screen readers. | string | `Thumbs down feedback button`                                               |

### QuestionBar

| Property name         | Description                                                            | Type            | Default                               |
| --------------------- | ---------------------------------------------------------------------- | --------------- | ------------------------------------- |
| clearHistory          | Text label for the clear history button. Leave empty to use icon only. | string          | ``                                    |
| clearHistoryTitle     | Tooltip text displayed when hovering over the clear history button.    | string          | `Clear discussion and history`        |
| clearHistoryAriaLabel | Accessibility label for the clear history button for screen readers.   | string          | `Clear discussion and history button` |
| submit                | Text label for the submit button. Leave empty to use icon only.        | string          | ``                                    |
| submitAriaLabel       | Accessibility label for the submit button for screen readers.          | string          | `Submit button`                       |
| **input**             | Input options                                                          | [Input](#Input) |                                       |

#### Input

| Property name | Description                                                                         | Type   | Default                |
| ------------- | ----------------------------------------------------------------------------------- | ------ | ---------------------- |
| placeholder   | Placeholder text shown in the input field when empty. Guides users on what to type. | string | `Ask me a question...` |

<!-- WORDING_TABLE_END -->

Example :

```Javascript
TockVueKit.renderChat(
  document.getElementById("<TARGET_ELEMENT_ID>"),
  "<TOCK_BOT_API_URL>",
  {
    "wording": {
      "messages": {
        "message": {
          "header": {
            "labelUser": "Vous"
          },
          "footnotes": {
            "sources": "Sources :",
            "showMoreLink": "> Voir plus"
          }
        }
      },
      "questionBar": {
        "clearHistoryAriaLabel": "Effacer la discussion et l'historique",
        "input": {
          "placeholder": "Posez moi une question..."
        },
        "submitAriaLabel": "Bouton d'envoi"
      },
      "connectionErrorMessage": "Une erreur est survenue. Merci de réessayer dans quelques instants."
    }
  }
)
```

## Visual customization

Most of the css rules that shape the widget are defined by css variables.

Each of these variables has a default value, which you are free to redefine according to your needs. Use your DevTools to identify the variables to overload or take a look at the [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) via its [demo page](https://doc.tock.ai/tock-vue-kit/).
The css variables are prefixed with the string “--tvk” so as not to unintentionally impact the page hosting the widget.

> [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) offers an easy way to define and export css variables customization (See [demo page](https://doc.tock.ai/tock-vue-kit/), click _Editor_ switch then see _Styling_ and _Output_ tabs)

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
    <script src="https://unpkg.com/vue@3.4/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/tock-vue-kit@2.0.0/dist/tock-vue-kit.iife.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/tock-vue-kit@2.0.0/dist/style.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
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
    <script src="https://unpkg.com/vue@3.4/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/tock-vue-kit@2.0.0/dist/tock-vue-kit.iife.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/tock-vue-kit@2.0.0/dist/style.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
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
    <script src="https://unpkg.com/vue@3.4/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/tock-vue-kit@2.0.0/dist/tock-vue-kit.iife.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/tock-vue-kit@2.0.0/dist/style.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
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

# Color Customization

The Tock Vue Kit implements a sophisticated **HSL-based theming system** with some key principles.
Take a look at the [demo page](https://doc.tock.ai/tock-vue-kit/) of the [Tock Vue Kit Editor](https://github.com/theopenconversationkit/tock-vue-kit-editor) to better understand this mechanism.

## Core Architecture

1. **Foundation variables** for brand customization using HSL
2. **Dual-variable system** for light/dark themes
3. **Theme-agnostic variables** for component usage (`--tvk_colors_*`)
4. **Automatic color generation** from base HSL values

### Color Variables Structure

#### Foundation Variables (HSL-based)

These base variables define your brand identity and automatically generate all other theme colors. By modifying these 3 values, you change the overall appearance of your interface.

```css
/* Brand foundation - generates all derived colors */
--tvk_colors_brand-hue: 210; /* 0-360 color wheel position */
--tvk_colors_brand-saturation: 80%; /* 0-100% color intensity */
--tvk_colors_brand-lightness: 50%; /* 0-100% color brightness */
```

#### Dual-Variable System

The system automatically generates light and dark variants from the foundation variables. These are prefixed with light* and dark* for precise theme customization.

```css
/* Light mode vars - automatically generated from base variables */
--tvk_colors_light_brand: hsl(
  var(--tvk_colors_brand-hue) var(--tvk_colors_brand-saturation) var(--tvk_colors_brand-lightness)
);

--tvk_colors_light_surface1: var(--tvk_colors_light_brand);
--tvk_colors_light_text1: hsl(
  var(--tvk_colors_brand-hue) var(--tvk_colors_brand-saturation) 100%
);

--tvk_colors_light_surface2: hsl(var(--tvk_colors_brand-hue) 10% 99%);
--tvk_colors_light_text2: hsl(var(--tvk_colors_brand-hue) 30% 30%);

/* Dark mode vars - also automatically generated */
--tvk_colors_dark_brand: hsl(
  var(--tvk_colors_brand-hue) var(--tvk_colors_brand-saturation) var(--tvk_colors_brand-lightness)
);

--tvk_colors_dark_surface1: var(--tvk_colors_dark_brand);
--tvk_colors_dark_text1: hsl(var(--tvk_colors_brand-hue) 10% 85%);

--tvk_colors_dark_surface2: hsl(var(--tvk_colors_brand-hue) 1% 15%);
--tvk_colors_dark_text2: hsl(var(--tvk_colors_brand-hue) 5% 65%);
```

#### Theme-Agnostic Variables

These variables automatically adapt to the current theme (light or dark) to ensure smooth theme switching.

```css
[data-theme="light"] {
  --tvk_colors_brand: var(--tvk_colors_light_brand);

  --tvk_colors_surface1: var(--tvk_colors_light_surface1);
  --tvk_colors_text1: var(--tvk_colors_light_text1);

  --tvk_colors_surface2: var(--tvk_colors_light_surface2);
  --tvk_colors_text2: var(--tvk_colors_light_text2);
}

[data-theme="dark"] {
  --tvk_colors_brand: var(--tvk_colors_dark_brand);

  --tvk_colors_surface1: var(--tvk_colors_dark_surface1);
  --tvk_colors_text1: var(--tvk_colors_dark_text1);

  --tvk_colors_surface2: var(--tvk_colors_dark_surface2);
  --tvk_colors_text2: var(--tvk_colors_dark_text2);
}
```

#### Themes activation

Themes are controlled via HTML attributes, allowing explicit and consistent theme switching.

```html
<!-- Light theme (default) -->
<html data-theme="light"></html>
```

```html
<!-- Dark theme -->
<html data-theme="dark"></html>
```

```html
<!-- Bootstrap compatibility -->
<html data-bs-theme="dark"></html>
```

**Important:** The kit intentionally does not automatically respond to prefers-color-scheme to maintain consistency with the hosting website's theme behavior.

#### Themes customization

For effective theme customization:

1 - Always modify theme-specific variables (--tvk\_**colors_light**\_\* and --tvk\_**colors_dark**\_\*) rather than theme-agnostic variables (--tvk\_**colors**\_\*).

2 - Use the HSL system to maintain color consistency between themes:

```css
:root {
  /* Recommended customization - modify light/dark variables */
  --tvk_colors_light_surface1: hsl(
    var(--tvk_colors_brand-hue) calc(var(--tvk_colors_brand-saturation) - 20%)
      90%
  );

  --tvk_colors_dark_surface1: hsl(
    var(--tvk_colors_brand-hue) calc(var(--tvk_colors_brand-saturation) - 10%)
      20%
  );
}
```

3 - Avoid directly modifying theme-agnostic variables like --tvk_colors_surface1 as this bypasses the automatic theme switching system.

4 - For specific cases, you can directly override a component property:

```css
:root {
  /* Example of direct override (use sparingly) */
  --tvk_message_answer_user_background: #e8f5e8;
}
```

5 - Always test your customizations in both themes to ensure visual consistency.

### Customization Examples

#### Corporate Blue Theme (Recommended Approach)

```css
\:root {
  /* Brand foundation - all colors derive from these */
  --tvk_colors_brand-hue: 210; /* Blue */
  --tvk_colors_brand-saturation: 80%;
  --tvk_colors_brand-lightness: 50%;

  /* Feedback colors */
  --tvk_colors_good-hue: 120; /* Green */
  --tvk_colors_bad-hue: 0; /* Red */

  /* Custom surface colors using HSL */
  --tvk_colors_light_surface1: hsl(
    var(--tvk_colors_brand-hue) calc(var(--tvk_colors_brand-saturation) - 20%)
      90%
  );
  --tvk_colors_dark_surface1: hsl(
    var(--tvk_colors_brand-hue) calc(var(--tvk_colors_brand-saturation) - 10%)
      20%
  );

  /* Message bubble customization using theme variables */
  --tvk_message_answer_user_background: var(--tvk_colors_surface1);
  --tvk_message_answer_bot_background: var(--tvk_colors_background);
}
```

#### Direct Color Override (When Needed)

```css
\:root {
  /* Direct color override example */
  --tvk_message_answer_user_background: #e8f5e8;

  /* Using theme variables for other properties */
  --tvk_message_answer_user_color: var(--tvk_colors_text1);
  --tvk_message_answer_user_border: 1px solid var(--tvk_colors_neutral-dim);
}
```

### Best Practices

- Start with foundation variables before overriding specific components
- Use HSL-based definitions for consistent color relationships
- Leverage theme-agnostic variables (--tvk*colors*\*) in your components
- Maintain sufficient contrast (minimum 4.5:1 for normal text)
- Document your customizations in a separate CSS file
- Test in both themes if implementing dark mode

### Key Benefits

- Consistent theming across all components
- Easy maintenance through centralized variable management
- Flexible branding without component modification
- Automatic dark/light switching via HTML attributes
- Future-proof design that accommodates new components
- HSL-based system ensures color harmony across themes

## Contributing

Pull requests are welcome! For any kind of change, please open an issue first.

- See the `demo` branch of this repository for more information.

## Support

For bugs or feature requests, please open an [issue](https://github.com/theopenconversationkit/tock-vue-kit/issues).
