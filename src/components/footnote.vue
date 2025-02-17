<script setup lang="ts">
import { ref } from "vue";

import { Marked } from "marked";
import DOMPurify from "dompurify";
import { sanitizeURLSync } from "url-sanitizer";

import hljs from "highlight.js";

import { markedHighlight } from "marked-highlight";

import "katex/dist/katex.min.css";
import { katexBlockExtension, katexInlineExtension } from "../utils/markup";

import type { MessageFootnote } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options-singleton";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  footnote: MessageFootnote;
}>();

const showFullText = ref<boolean>(false);

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
    },
  }),
  hooks: {
    postprocess: (html) => DOMPurify.sanitize(html),
  },
  extensions: [katexBlockExtension, katexInlineExtension],
  gfm: true,
});

function getMarkUp(): string | Promise<string> {
  let output = marked.parse(props.footnote!.content!);

  return output;
}

const contentTxt = ref<HTMLDivElement | null>(null);

function isClamped(): boolean {
  if (!contentTxt.value) return false;
  return contentTxt.value.offsetHeight < contentTxt.value.scrollHeight;
}

function sanitizeUrl(url: string): string | undefined {
  return sanitizeURLSync(url) || undefined;
}
</script>

<template>
  <div class="tvk-footnote">
    <a
      v-if="props.footnote!.url"
      :href="sanitizeUrl(props.footnote!.url)"
      target="_blank"
      class="tvk-footnote-title"
    >
      {{ props.footnote!.title }}
    </a>

    <span v-if="!props.footnote!.url" class="tvk-footnote-title">
      {{ props.footnote!.title }}
    </span>

    <div class="tvk-footnote-content" v-if="props.footnote!.content">
      <div
        ref="contentTxt"
        :style="{
          '--tvk-clamp-nb-line':
            appOptions.preferences.messages.footNotes.clampSourceContentNbLines,
        }"
        :class="{
          'tvk-clamp':
            appOptions.preferences.messages.footNotes.clampSourceContent &&
            !showFullText,
        }"
      >
        <template
          v-if="!appOptions.preferences.messages.footNotes.parseContentMarkdown"
          >{{ props.footnote!.content }}</template
        >
        <span
          v-if="appOptions.preferences.messages.footNotes.parseContentMarkdown"
          v-html="getMarkUp()"
        ></span>
      </div>

      <a
        href="javascript:void(0)"
        class="tvk-footnote-content-show-more-link"
        v-if="
          props.footnote!.content &&
          appOptions.preferences.messages.footNotes.clampSourceContent && !showFullText && isClamped()
        "
        @click="showFullText = !showFullText"
      >
        {{ appOptions.wording.messages.message.footnotes.showMoreLink }}
      </a>
    </div>
  </div>
</template>
