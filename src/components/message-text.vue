<script setup lang="ts">
import { ref } from "vue";

import { Marked } from "marked";
import DOMPurify from "dompurify";

import "katex/dist/katex.min.css";

import hljs from "highlight.js";
import "highlight.js/styles/default.min.css";
import { markedHighlight } from "marked-highlight";

import { katexBlockExtension, katexInlineExtension } from "../utils/markup";

import { type TextMessage } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options-singleton";

import Button from "./button.vue";
import Footnotes from "./footnotes.vue";
import { copyToClipboard } from "../utils/misc";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  message: TextMessage;
}>();

const messageContentWrapper = ref();

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("rel", "noreferrer");
    node.setAttribute("target", "_blank");
  }
});

const marked = new Marked({
  ...markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
      // return hljs.highlightAuto(code).value;
    },
  }),
  hooks: {
    postprocess: (html) => DOMPurify.sanitize(html),
  },
  extensions: [katexBlockExtension, katexInlineExtension],
  gfm: true,
});

function getMarkUp(): string | Promise<string> {
  let output = marked.parse(props.message!.text);

  setTimeout(() => {
    copyButtonsInit();
  }, 100);

  return output;
}

function copyButtonsInit() {
  messageContentWrapper.value
    .querySelectorAll("pre:has(> code)")
    .forEach((preEl: HTMLElement) => {
      if (!preEl.dataset.copyButtonInjected) {
        injectCopyButton(preEl);
      }
    });
}

function injectCopyButton(preEl: HTMLElement) {
  const copyButton = document.createElement("button");

  copyButton.classList.add("tvk-btn");
  copyButton.classList.add("tvk-message-content-copy-button");

  copyButton.innerHTML = '<i class="bi bi-copy"></i>';
  copyButton.addEventListener("click", () => {
    copyToClipboard(preEl.innerText);
    copyButton.innerHTML = '<i class="bi bi-check-lg"></i>';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="bi bi-copy"></i>';
    }, 2000);
  });

  preEl.addEventListener("mouseenter", () => {
    copyButton.style.display = "block";
  });
  preEl.addEventListener("mouseleave", () => {
    copyButton.style.display = "none";
    copyButton.innerHTML = '<i class="bi bi-copy"></i>';
  });

  preEl.appendChild(copyButton);
  preEl.dataset.copyButtonInjected = "true";
}
</script>

<template>
  <div
    ref="messageContentWrapper"
    class="tvk-message-content-wrapper"
    v-html="getMarkUp()"
    tabindex="1"
  ></div>

  <Footnotes
    v-if="props.message!.footnotes?.length && appOptions.preferences.messages.footNotes.display && !appOptions.preferences.messages.footNotes.displayOnMessageSide"
    :footnotes="props.message!.footnotes"
  ></Footnotes>

  <Button v-for="button in props.message!.buttons" :button="button">
    {{ button.title }}
  </Button>
</template>
