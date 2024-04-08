# Tock Vue Kit

A Vue 3 toolkit to easily embed [Tock](https://doc.tock.ai) into web pages.

## Prerequisites

- Run a [Tock Bot in API mode](https://doc.tock.ai/tock/en/dev/bot-api/) ([NodeJS alternative](https://github.com/theopenconversationkit/tock-node))

## Quick Start

Include js and css files :

```html
<link href="/dist/assets/index.css" rel="stylesheet" />
<script src="/dist/assets/index.js"></script>
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
