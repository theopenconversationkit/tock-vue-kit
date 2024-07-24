<script setup lang="ts">
import { ref } from "vue";
import linkifyHtml from "linkify-html";
import type { MessageFootnote } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options-singleton";
const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  footnote: MessageFootnote;
}>();

const showFullText = ref<boolean>(false);

function getLinkyfiedSourceContent(): string {
  return linkifyHtml(props.footnote!.content!, { target: "_blank" });
}

const contentTxt = ref<HTMLDivElement | null>(null);

function isClamped(): boolean {
  if (!contentTxt.value) return false;
  return contentTxt.value.offsetHeight < contentTxt.value.scrollHeight;
}
</script>

<template>
  <div class="tvk-footnote">
    <a
      v-if="props.footnote!.url"
      :href="props.footnote!.url"
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
        <span v-html="getLinkyfiedSourceContent()"></span>
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
