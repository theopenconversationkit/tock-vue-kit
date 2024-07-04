<script setup lang="ts">
import questionBlock from "./components/question-block.vue";
import messages from "./components/messages.vue";
import { appOptionsSingleton } from "./utils/app-options-singleton";
import { useMainStore } from "./stores/main-state";
import { ref } from "vue";

const appOptions = appOptionsSingleton.getOptions();
const mainStore = useMainStore();

let randomKey = ref(getRandomKey());
let isDisplayed = ref(true);

function getRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "updateApplication") {
    after(() => {
      randomKey.value = getRandomKey();
      isDisplayed.value = false;
      setTimeout(() => {
        isDisplayed.value = true;
      });
    });
  }
});
</script>

<template>
  <div class="tvk-wrapper" :key="randomKey" v-if="isDisplayed">
    <messages
      v-if="
        mainStore.getMessages.length ||
        !appOptions.preferences.messages.hideIfNoMessages
      "
    ></messages>
    <questionBlock></questionBlock>
  </div>
</template>

<style lang="scss"></style>
./utils/app-options-singleton
