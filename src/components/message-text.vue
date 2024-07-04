<script setup lang="ts">
import linkifyHtml from "linkify-html";
import Button from "./button.vue";
import Footnotes from "./footnotes.vue";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import type { TextMessage } from "../models/messages";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  message: TextMessage;
}>();

function getLinkyfiedText(): string {
  return linkifyHtml(props.message!.text, { target: "_blank" });
}
</script>

<template>
  <div v-html="getLinkyfiedText()" tabindex="1"></div>

  <Footnotes
    v-if="props.message!.footnotes?.length && appOptions.preferences.messages.footNotes.display && !appOptions.preferences.messages.footNotes.displayOnMessageSide"
    :footnotes="props.message!.footnotes"
  ></Footnotes>

  <Button v-for="button in props.message!.buttons" :button="button">
    {{ button.title }}
  </Button>
</template>
