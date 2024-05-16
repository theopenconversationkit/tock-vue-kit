<script setup lang="ts">
import linkifyHtml from "linkify-html";
import Button from "./button.vue";
import Footnotes from "./footnotes.vue";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import type { TextMessage } from "../models/messages";
import type { PropType } from "vue";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps({
  message: {
    type: Object as PropType<TextMessage>,
  },
});

function getLinkyfiedText() {
  return linkifyHtml(props.message!.text, { target: "_blank" });
}
</script>

<template>
  <div v-html="getLinkyfiedText()" tabindex="1"></div>

  <Footnotes
    v-if="props.message!.footnotes?.length"
    :footnotes="props.message!.footnotes"
  ></Footnotes>

  <Button v-for="button in props.message!.buttons" :button="button">
    {{ button.title }}
  </Button>
</template>
