<script setup lang="ts">
import questionBlock from "./components/question-block.vue";
import messages from "./components/messages.vue";
import appOptionsSingleton from "./utils/app-options";
import { useMainStore } from "./stores/main-state";
const appOptions = appOptionsSingleton.getInstance().options;
const mainStore = useMainStore();
</script>

<template>
  <main class="tvk-wrapper">
    <messages
      v-if="
        mainStore.getMessages.length ||
        !appOptions.preferences.messages.hideIfNoMessages
      "
    ></messages>
    <questionBlock></questionBlock>
  </main>
</template>

<style lang="scss"></style>
