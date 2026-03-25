<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { useMainStore } from "../stores/main-state";
import message from "./message.vue";

const mainStore = useMainStore();
const messagesWrapper = ref<HTMLElement>();
const messageRefs = ref<InstanceType<typeof message>[]>([]);

function scrollBottom(): void {
  if (!messagesWrapper.value) return;
  messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
}

async function scrollToLastBotMessage(): Promise<void> {
  await nextTick();

  const wrapper = messagesWrapper.value;
  if (!wrapper) return;

  // Get the last message DOM element from the message refs
  const lastEl = messageRefs.value[messageRefs.value.length - 1]?.$el as
    | HTMLElement
    | undefined;
  if (!lastEl) {
    scrollBottom();
    return;
  }

  const wrapperHeight = wrapper.clientHeight;
  const messageHeight = lastEl.offsetHeight;

  if (messageHeight >= wrapperHeight) {
    // Message overflows the visible area: scroll to its top so the user reads from the beginning
    lastEl.scrollIntoView({ block: "start", behavior: "smooth" });
  } else {
    // Message fits in the visible area: default scroll to bottom behavior
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
