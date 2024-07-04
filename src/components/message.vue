<script setup lang="ts">
import messageText from "./message-text.vue";
import messageCard from "./message-card.vue";
import messageCarousel from "./message-carousel.vue";
import messageImage from "./message-image.vue";
import Footnotes from "./footnotes.vue";
import { MessageAuthor, MessageType, type Message } from "../models/messages";

import { appOptionsSingleton } from "../utils/app-options-singleton";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  message: Message;
}>();
</script>

<template>
  <div
    v-if="props.message!.author !== MessageAuthor.user || !appOptions.preferences.messages.message.hideUserMessages"
    class="tvk-message"
    :class="{
      'tvk-message-user': props.message!.author === MessageAuthor.user,
      'tvk-message-bot': props.message!.author === MessageAuthor.bot
    }"
  >
    <div class="tvk-message-answer">
      <div
        class="tvk-message-header"
        v-if="appOptions.preferences.messages.message.header.display && props.message!.author !== MessageAuthor.app"
      >
        <div
          class="tvk-message-header-avatar"
          v-if="appOptions.preferences.messages.message.header.avatar.display"
        >
          <i
            v-if="!appOptions.preferences.messages.message.header.avatar.userImage && appOptions.preferences.messages.message.header.avatar.userIcon && props.message!.author === MessageAuthor.user"
            class="tvk-message-header-avatar-user"
            :class="
              appOptions.preferences.messages.message.header.avatar.userIcon
            "
          ></i>
          <img
            v-if="appOptions.preferences.messages.message.header.avatar.userImage && props.message!.author === MessageAuthor.user"
            :src="
              appOptions.preferences.messages.message.header.avatar.userImage
                .src
            "
            :style="{
              width:
                appOptions.preferences.messages.message.header.avatar.userImage
                  .width,
              height:
                appOptions.preferences.messages.message.header.avatar.userImage
                  .height,
            }"
            role="none"
          />

          <i
            v-if="!appOptions.preferences.messages.message.header.avatar.botImage && appOptions.preferences.messages.message.header.avatar.botIcon && props.message!.author === MessageAuthor.bot"
            class="tvk-message-header-avatar-bot"
            :class="
              appOptions.preferences.messages.message.header.avatar.botIcon
            "
          ></i>
          <img
            v-if="appOptions.preferences.messages.message.header.avatar.botImage && props.message!.author === MessageAuthor.bot"
            :src="
              appOptions.preferences.messages.message.header.avatar.botImage.src
            "
            :style="{
              width:
                appOptions.preferences.messages.message.header.avatar.botImage
                  .width,
              height:
                appOptions.preferences.messages.message.header.avatar.botImage
                  .height,
            }"
            role="none"
          />
        </div>

        <div
          class="tvk-message-header-label"
          v-if="appOptions.preferences.messages.message.header.label.display"
        >
          <span class="tvk-message-header-label-user">
            {{ appOptions.wording.messages.message.header.labelUser }}
          </span>
          <span class="tvk-message-header-label-bot">
            {{ appOptions.wording.messages.message.header.labelBot }}
          </span>
        </div>
      </div>

      <div
        class="tvk-message-body"
        v-if="props.message!.author !== MessageAuthor.app"
      >
        <messageText
          v-if="props.message!.type === MessageType.message"
          :message="props.message"
        ></messageText>
        <messageCard
          v-if="props.message!.type === MessageType.card"
          :card="props.message!"
        ></messageCard>
        <messageCarousel
          v-if="props.message!.type === MessageType.carousel"
          :carousel="props.message!"
        ></messageCarousel>
        <messageImage
          v-if="props.message!.type === MessageType.image"
          :message="props.message"
        ></messageImage>
      </div>

      <div
        class="tvk-message-body-from-app"
        v-if="props.message!.author === MessageAuthor.app"
      >
        <div
          v-if="props.message!.type === MessageType.loader"
          class="tvk-message-loader"
        ></div>
        <div
          v-if="props.message!.type === MessageType.error"
          class="tvk-error-connection"
        >
          <i class="tvk-error-icon bi bi-exclamation-triangle"></i>
          {{ props.message.text }}
        </div>
      </div>
    </div>

    <div
      class="tvk-side-footnotes"
      v-if="props.message!.footnotes?.length &&
        appOptions.preferences.messages.footNotes.display &&
        appOptions.preferences.messages.footNotes.displayOnMessageSide
      "
    >
      <Footnotes :footnotes="props.message!.footnotes"></Footnotes>
    </div>
  </div>
</template>

<style></style>
