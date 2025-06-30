<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import Footnote from "./footnote.vue";
import type { MessageFootnote } from "../models/messages";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  footnotes: MessageFootnote[];
}>();

const deduplicatedFootnotes: ComputedRef<MessageFootnote[]> = computed(() => {
  const seen = new Set<string>();
  const result: MessageFootnote[] = [];

  for (const item of props.footnotes) {
    const key = `${item.url}|${item.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
});
</script>

<template>
  <div class="tvk-footnotes">
    <span class="tvk-footnotes-sources-label">{{
      appOptions.wording.messages.message.footnotes.sources
    }}</span>
    <Footnote
      v-for="(footnote, index) in deduplicatedFootnotes"
      :footnote="footnote"
      :index="index"
    ></Footnote>
  </div>
</template>
