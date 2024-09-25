<script setup lang="ts">
import { useMainStore } from "../stores/main-state";
import type { CardMessage } from "../models/messages";
import Button from "./button.vue";

const mainStore = useMainStore();

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
    <a
      v-if="props.card?.file?.type === 'image'"
      :href="props.card?.file?.url"
      target="_blank"
    >
      <img
        :src="props.card?.file?.url"
        :alt="imageAlternative"
        @load="onImgLoad"
        class="tvk-thumbnail"
      />
    </a>

    <a
      v-if="props.card?.file?.type === 'file'"
      :href="props.card?.file?.url"
      target="_blank"
      >{{ props.card?.file?.name }}</a
    >

    <div v-if="props.card?.title">
      <strong>{{ props.card?.title }}</strong>
    </div>
    <div v-if="props.card?.subTitle">
      {{ props.card?.subTitle }}
    </div>
    <div v-if="props.card?.file?.description">
      {{ props.card?.file?.description }}
    </div>

    <Button v-for="button in props.card!.buttons" :button="button">
      {{ button.title }}
    </Button>
  </div>
</template>
