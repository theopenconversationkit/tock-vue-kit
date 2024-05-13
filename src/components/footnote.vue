<script setup lang="ts">
import type { PropType } from "vue";
import type { MessageFootnote } from "../models/messages";

const props = defineProps({
  footnote: {
    type: Object as PropType<MessageFootnote>,
  },
});
</script>

<template>
  <div class="tvk-message-footnote">
    <a :href="props.footnote!.url" target="_blank">
      {{ props.footnote!.title }}
    </a>
    <div>
      {{ props.footnote!.content }}
    </div>
  </div>
</template>
