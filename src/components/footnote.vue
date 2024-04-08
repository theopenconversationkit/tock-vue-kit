<script setup lang="ts">
import type { PropType } from 'vue';
import type { MessageFootnote } from '../models/messages';

const props = defineProps({
  footnote: {
    type: Object as PropType<MessageFootnote>
  }
});
</script>

<template>
  <a
    class="tvk-message-footnote"
    :href="props.footnote!.url"
    target="_blank"
  >
    {{ props.footnote!.title }}
  </a>
</template>
