<script setup lang="ts">
import { appOptionsSingleton } from "../utils/app-options-singleton";
import Footnote from "./footnote.vue";
import type { MessageFootnote } from "../models/messages";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  footnotes: MessageFootnote[];
}>();
</script>

<template>
  <div class="tvk-footnotes">
    {{ appOptions.wording.messages.message.footnotes.sources }}
    <Footnote
      v-for="footnote in props.footnotes"
      :footnote="footnote"
    ></Footnote>
  </div>
</template>
