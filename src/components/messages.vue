<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useMainStore } from "../stores/main-state";
import message from "./message.vue";

const mainStore = useMainStore();
const messagesWrapper = ref();

function scrollBottom(): void {
  setTimeout(() => {
    messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
  }, 100);
}

onMounted(() => {
  scrollBottom();
});

mainStore.$onAction(({ name, store, args, after }) => {
  if (name === "scrollMessages") {
    after(() => {
      setTimeout(() => {
        scrollBottom();
      });
    });
  }
});
</script>

<template>
  <div ref="messagesWrapper" class="tvk-messages">
    <div class="tvk-shader tvk-shader-top"></div>
    <message v-for="mssg in mainStore.getMessages" :message="mssg"></message>
    <div class="tvk-shader tvk-shader-bottom"></div>
  </div>
</template>

<style lang="scss"></style>
