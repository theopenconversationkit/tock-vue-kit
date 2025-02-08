<script setup lang="ts">
import { ref } from "vue";

import linkifyHtml from "linkify-html";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import hljs from "highlight.js";
import "highlight.js/styles/default.min.css";

import "katex/dist/katex.min.css";
// @ts-ignore
import renderMathInElement from "katex/contrib/auto-render";

import { MessageAuthor, type TextMessage } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import { containsMarkdownFormatting, containsHTML } from "../utils/markup";
import Button from "./button.vue";
import Footnotes from "./footnotes.vue";
import { copyToClipboard } from "../utils/misc";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  message: TextMessage;
}>();

const whiteSpaceStyle = ref("pre-line");
const messageContentWrapper = ref();

function getMarkUp(): string {
  let output = props.message!.text;
  // Return user message untouched
  if (props.message!.author !== MessageAuthor.bot) return output;

  // Latex syntax conversions
  output = output
    // Deletes file references between 【】(Japanese characters)
    .replace(/【[^】]*】/g, "")
    // Convert LaTeX inline syntax \( ... \) to $ ... $
    .replace(/\\\(((?:[^\\]|\\[^)])*?)\\\)/g, (_, math) => `$${math.trim()}$`)
    // Converting LaTeX block \[ ... \] syntax to $$ ... $$
    .replace(
      /\\\[((?:[^\\]|\\[^\]])*?)\\]/g,
      (_, math) => `$$${math.trim().replace(/\n/g, " ")}$$`
    );

  if (containsMarkdownFormatting(output)) {
    whiteSpaceStyle.value = "normal";
    output = micromark(output, {
      allowDangerousHtml: true, // Html markup can easily be detected as MD. We need this to allow it and render html properly or to render properly html fragments in MD source
      extensions: [gfm()],
      htmlExtensions: [gfmHtml()],
    });
  } else if (containsHTML(output)) {
    whiteSpaceStyle.value = "normal";
  } else {
    whiteSpaceStyle.value = "pre-line";
    output = linkifyHtml(output, { target: "_blank" });
  }

  setTimeout(() => {
    highlightAll();
    copyButtonsInit();
  });

  return output;
}

function highlightAll() {
  messageContentWrapper.value
    .querySelectorAll("code")
    .forEach((e: HTMLElement) => {
      if (!e.dataset.highlighted) {
        hljs.highlightElement(e);
      }
    });

  renderMathInElement(messageContentWrapper.value, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
  });
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
    :style="{ 'white-space': whiteSpaceStyle }"
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
