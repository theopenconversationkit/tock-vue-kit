<script setup lang="ts">
import type { PropType } from 'vue';
import type { Button } from '../models/messages';
import { useMainStore } from '../stores/main-state';

const mainStore = useMainStore();

const props = defineProps({
  button: {
    type: Object as PropType<Button>
  }
});

function sendButtonMessage() {
  mainStore.sendUserMessage(props.button!.title);
}
</script>

<template>
  <button
    class="tvk-btn tvk-btn-action"
    @click="sendButtonMessage"
  >
    {{ props.button!.title }}
  </button>
</template>
