<script setup lang="ts">
import type { PropType } from 'vue';
import Footnote from './footnote.vue';
import type { MessageFootnote } from '../models/messages';

const props = defineProps({
  footnotes: {
    type: Object as PropType<MessageFootnote[]>
  }
});
</script>

<template>
  <div class="tvk-message-footnotes">
    Sources :
    <Footnote
      v-for="footnote in props.footnotes"
      :footnote="footnote"
    ></Footnote>
  </div>
</template>
