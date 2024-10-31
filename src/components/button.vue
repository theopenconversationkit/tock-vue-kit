<script setup lang="ts">
import { ButtonType, type Button } from "../models/messages";
import { useMainStore } from "../stores/main-state";

const mainStore = useMainStore();

const props = defineProps<{
  button: Button;
}>();

function sendButtonMessage() {
  if (props.button.type === ButtonType.web_url) {
    window.open(
      props.button.url,
      props.button.target,
      props.button.windowFeatures
    );
  } else {
    mainStore.sendUserMessage(props.button!.title);
  }
}
</script>

<template>
  <button class="tvk-btn tvk-btn-action" @click="sendButtonMessage">
    {{ props.button!.title }}
  </button>
</template>
