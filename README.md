# Tock Vue Kit

A Vue 3 toolkit to easily embed [Tock](https://doc.tock.ai) into web pages.

## Demo

Try the Tock Vue Kit (and the Tock Vue Kit Editor) on the [demo page](https://doc.tock.ai/tock-vue-kit/)

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/) ([NodeJS alternative](https://github.com/theopenconversationkit/tock-node))

## Quick Start

Install the dependency :
```
npm i tock-vue-kit
```

Include js and css files :

```html
<script src="https://unpkg.com/vue@3.4"></script>
<link href="node_modules/tock-vue-kit/dist/style.css" rel="stylesheet" />
<script src="node_modules/tock-vue-kit/dist/tock-vue-kit.umd.cjs"></script>
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
