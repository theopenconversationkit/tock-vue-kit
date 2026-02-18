<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import Footnote from "./footnote.vue";
import type { MessageFootnote } from "../models/messages";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  footnotes: MessageFootnote[];
}>();

function isMissingTitle(footnote: MessageFootnote): boolean {
  if (footnote.isTitleFallback) return true;

  const trimmedTitle = footnote.title?.trim();
  if (!trimmedTitle) return true;

  return trimmedTitle === "No page title found";
}

function hasDisplayableData(footnote: MessageFootnote): boolean {
  const hasUrl = Boolean(footnote.url?.trim());
  const hasContent = Boolean(footnote.content?.trim());

  return !isMissingTitle(footnote) || hasUrl || hasContent;
}

function getDeduplicationKey(footnote: MessageFootnote): string {
  const identifier = footnote.identifier?.trim();
  if (identifier) return identifier;

  const url = footnote.url?.trim() ?? "";
  const content = footnote.content?.trim() ?? "";
  const title = isMissingTitle(footnote) ? "" : footnote.title?.trim() ?? "";

  if (!title && content) return `${url}|${content}`;

  return `${url}|${title}`;
}

const deduplicatedFootnotes: ComputedRef<MessageFootnote[]> = computed(() => {
  const seen = new Set<string>();
  const result: MessageFootnote[] = [];

  for (const item of props.footnotes) {
    if (!hasDisplayableData(item)) continue;
    const key = getDeduplicationKey(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
});
</script>

<template>
  <div class="tvk-footnotes" v-if="deduplicatedFootnotes.length">
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
