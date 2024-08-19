# Tock Vue Kit

A Vue 3 toolkit to easily embed [Tock](https://doc.tock.ai) into web pages.

## Demo

Try the Tock Vue Kit (and the Tock Vue Kit Editor) on the [demo page](https://doc.tock.ai/tock-vue-kit/)

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/)

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

Customization options are functional options of the application. For visual widget customization, see _[Visual customization](#Visual customization)_ below.
Customization options are provided in the form of an object that can contain the following attributes:

```
{
  localStorage: [LocalStorage](#LocalStorage);
  initialization: [Initialization](#Initialization);
  preferences: [Preferences](#Preferences);
  wording: [Wording](#Wording);
}
```

### LocalStorage

Options relating to the persistence in _localStorage_ of messages exchanged by the user with the Tock instance :

| Property name     | Description                                                                                   | Default   |
| ----------------- | --------------------------------------------------------------------------------------------- | --------- |
| enabled           | Retain conversation history in local storage                                                  | False     |
| prefix            | Prefix for local storage keys allowing communication with different bots from the same domain | undefined |
| maxNumberMessages | Maximum number of messages to store in local storage                                          | 20        |

### Initialization

### Preferences

### Wording

## Visual customization

Wip
