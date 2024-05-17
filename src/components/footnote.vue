<script setup lang="ts">
import linkifyHtml from "linkify-html";
import type { MessageFootnote } from "../models/messages";

const props = defineProps<{
  footnote: MessageFootnote;
}>();

function getLinkyfiedSourceContent(): string {
  return linkifyHtml(props.footnote!.content!, { target: "_blank" });
}
</script>

<template>
  <div class="tvk-footnote">
    <a :href="props.footnote!.url" target="_blank">
      {{ props.footnote!.title }}
    </a>
    <div
      v-if="props.footnote!.content"
      v-html="getLinkyfiedSourceContent()"
    ></div>
  </div>
</template>
