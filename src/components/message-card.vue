<script setup lang="ts">
import { appOptionsSingleton } from "../utils/app-options-singleton";
import { useMainStore } from "../stores/main-state";
import type { CardMessage } from "../models/messages";

const mainStore = useMainStore();
const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  card: CardMessage;
}>();

const imageAlternative = props.card?.file?.description ?? props.card?.title;

function onImgLoad(event: Event): void {
  if (props.card!.file._loaded) return;
  props.card!.file._loaded = true;
  mainStore.scrollMessages();
}
</script>

<template>
  <div class="tvk-card">
    <img
      v-if="props.card?.file?.url"
      :src="props.card?.file?.url"
      :alt="imageAlternative"
      @load="onImgLoad"
      class="tvk-thumbnail"
    />

    <div v-if="props.card?.title">
      <strong>{{ props.card?.title }}</strong>
    </div>
    <div v-if="props.card?.subTitle">
      {{ props.card?.subTitle }}
    </div>
    <div v-if="props.card?.file?.description">
      {{ props.card?.file?.description }}
    </div>
  </div>
</template>
