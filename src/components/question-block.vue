<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "../stores/main-state";
import { appOptionsSingleton } from "../utils/app-options";

const appOptions = appOptionsSingleton.getInstance().options;

const mainStore = useMainStore();

const maxChars = appOptions.preferences.questionBar.maxUserInputLength;

const input = ref<HTMLInputElement | null>(null);

const typedChars = ref<string>("");

function handleClick() {
  if (input?.value) input.value.focus();
}

function nbTypedChars() {
  return typedChars.value.trim().length;
}

function userInputExceedLenth() {
  return nbTypedChars() > maxChars;
}

function onSubmit() {
  if (nbTypedChars() && !userInputExceedLenth()) {
    mainStore.sendUserMessage(typedChars.value);
    if (appOptions.preferences.questionBar.clearTypedCharsOnSubmit) {
      typedChars.value = "";
    }
  }
}

function onClearHistory() {
  mainStore.clearHistory();
}
</script>

<template>
  <div class="tvk-question-bar" @click="handleClick">
    <button
      v-if="appOptions.preferences.questionBar.clearHistory?.display"
      class="tvk-btn tvk-question-bar-btn-clear-history"
      @click="onClearHistory"
    >
      <i
        v-if="
          !appOptions.preferences.questionBar.clearHistory.image &&
          appOptions.preferences.questionBar.clearHistory.icon
        "
        :class="appOptions.preferences.questionBar.clearHistory.icon"
      ></i>

      <img
        v-if="appOptions.preferences.questionBar.clearHistory.image"
        :src="appOptions.preferences.questionBar.clearHistory.image.src"
        :style="{
          width: appOptions.preferences.questionBar.clearHistory.image.width,
          height: appOptions.preferences.questionBar.clearHistory.image.height,
        }"
      />
      {{ appOptions.wording.questionBar.clearHistory }}
    </button>

    <form @submit.prevent="onSubmit" class="tvk-question-bar-form">
      <input
        ref="input"
        class="tvk-question-bar-input"
        :maxlength="appOptions.preferences.questionBar.maxUserInputLength"
        :placeholder="appOptions.wording.questionBar.input.placeholder"
        v-model="typedChars"
      />
      <div class="tvk-question-bar-chars-count">
        {{ nbTypedChars() }}/{{ maxChars }}
      </div>
    </form>

    <button
      @click="onSubmit"
      :disabled="!typedChars.trim().length || userInputExceedLenth()"
      class="tvk-btn tvk-question-bar-btn-submit"
    >
      <i
        v-if="
          !appOptions.preferences.questionBar.submit.image &&
          appOptions.preferences.questionBar.submit.icon
        "
        :class="appOptions.preferences.questionBar.submit.icon"
      ></i>

      <img
        v-if="appOptions.preferences.questionBar.submit.image"
        :src="appOptions.preferences.questionBar.submit.image.src"
        :style="{
          width: appOptions.preferences.questionBar.submit.image.width,
          height: appOptions.preferences.questionBar.submit.image.height,
        }"
      />
      {{ appOptions.wording.questionBar.submit }}
    </button>
  </div>
</template>
