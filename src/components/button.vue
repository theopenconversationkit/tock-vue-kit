<script setup lang="ts">
import type { Button } from "../models/messages";
import { useMainStore } from "../stores/main-state";

const mainStore = useMainStore();

const props = defineProps<{
  button: Button;
}>();

function sendButtonMessage() {
  mainStore.sendUserMessage(props.button!.title);
}
</script>

<template>
  <button class="tvk-btn tvk-btn-action" @click="sendButtonMessage">
    {{ props.button!.title }}
  </button>
</template>
