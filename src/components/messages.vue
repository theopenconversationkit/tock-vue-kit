<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useMainStore } from "../stores/main-state";
import message from "./message.vue";

const mainStore = useMainStore();
const messagesWrapper = ref();
const messageRefs = ref<InstanceType<typeof message>[]>([]);

function scrollBottom(): void {
  if (!messagesWrapper.value) return;
  messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
}

async function scrollToLastBotMessage(): Promise<void> {
  await nextTick();

  const wrapper = messagesWrapper.value;
  if (!wrapper) return;

  // Récupère le dernier élément DOM parmi les message refs
  const lastEl = messageRefs.value.at(-1)?.$el as HTMLElement | undefined;
  if (!lastEl) {
    scrollBottom();
    return;
  }

  const wrapperHeight = wrapper.clientHeight;
  const messageHeight = lastEl.offsetHeight;

  if (messageHeight >= wrapperHeight) {
    // Le message dépasse la zone : on positionne son début en haut
    lastEl.scrollIntoView({ block: "start", behavior: "smooth" });
  } else {
    // Le message tient dans la zone : comportement classique scroll to bottom
    scrollBottom();
  }
}

onMounted(() => {
  scrollBottom();
});

mainStore.$onAction(({ name, after }) => {
  if (name === "scrollMessages") {
    after(() => {
      scrollToLastBotMessage();
    });
  }
});
</script>

<template>
  <div ref="messagesWrapper" class="tvk-messages">
    <div class="tvk-shader tvk-shader-top"></div>
    <message
      v-for="(mssg, index) in mainStore.getMessages"
      :key="index"
      :message="mssg"
      ref="messageRefs"
    ></message>
    <div class="tvk-shader tvk-shader-bottom"></div>
  </div>
</template>

<style lang="scss"></style>
