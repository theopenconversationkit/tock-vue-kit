<script setup lang="ts">
import type { PropType } from "vue";
import Footnote from "./footnote.vue";
import type { MessageFootnote } from "../models/messages";
import { appOptionsSingleton } from "../utils/app-options";

const appOptions = appOptionsSingleton.getInstance().options;

const props = defineProps({
  footnotes: {
    type: Object as PropType<MessageFootnote[]>,
  },
});
</script>

<template>
  <div class="tvk-message-footnotes">
    {{ appOptions.wording.messages.message.footnotes.sources }}
    <Footnote
      v-for="footnote in props.footnotes"
      :footnote="footnote"
    ></Footnote>
  </div>
</template>
