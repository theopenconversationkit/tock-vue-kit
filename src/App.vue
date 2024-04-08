<script setup lang="ts">
import questionBlock from './components/question-block.vue';
import messages from './components/messages.vue';
import { useMainStore } from './stores/main-state';
const mainStore = useMainStore();
</script>

<template>
  <main class="tvk-main-wrapper">
    <messages v-if="mainStore.getMessages.length"></messages>
    <questionBlock></questionBlock>
  </main>
</template>

<style lang="scss"></style>
