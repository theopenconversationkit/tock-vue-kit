<script setup lang="ts">
import messageText from "./message-text.vue";
import messageCard from "./message-card.vue";
import messageCarousel from "./message-carousel.vue";
import messageImage from "./message-image.vue";
import Footnotes from "./footnotes.vue";
import {
  type ErrorMessage,
  MessageAuthor,
  MessageType,
  FeedbackVoteValue,
  type Message,
} from "../models/messages";

import { appOptionsSingleton } from "../utils/app-options-singleton";
import { useMainStore } from "../stores/main-state";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  message: Message;
}>();

const mainStore = useMainStore();

function onVote(direction: FeedbackVoteValue) {
  try {
    mainStore.reportFeedback(props.message, direction);
  } catch (e) {
    console.warn("reportFeedback failed", e);
  }
}
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
        class="tvk-message-feedback"
        v-if="props.message!.author === MessageAuthor.bot && appOptions.preferences.messages.feedback.enabled && props.message.actionId"
      >
        <button
          class="tvk-btn"
          :class="{
            'tvk-message-feedback-thumbsUpActive':
              props.message.metadata?.feedback?.vote === FeedbackVoteValue.Up,
          }"
          :aria-pressed="
            props.message.metadata?.feedback?.vote === FeedbackVoteValue.Up
          "
          :title="appOptions.wording.messages.feedback.thumbsUpTitle"
          :aria-label="appOptions.wording.messages.feedback.thumbsUpAriaLabel"
          @click.prevent="onVote(FeedbackVoteValue.Up)"
        >
          <i :class="appOptions.preferences.messages.feedback.thumbsUpIcon"></i>
        </button>
        <button
          class="tvk-btn"
          :class="{
            'tvk-message-feedback-thumbsDownActive':
              props.message.metadata?.feedback?.vote === FeedbackVoteValue.Down,
          }"
          :aria-pressed="
            props.message.metadata?.feedback?.vote === FeedbackVoteValue.Down
          "
          :title="appOptions.wording.messages.feedback.thumbsDownTitle"
          :aria-label="appOptions.wording.messages.feedback.thumbsDownAriaLabel"
          @click.prevent="onVote(FeedbackVoteValue.Down)"
        >
          <i
            :class="appOptions.preferences.messages.feedback.thumbsDownIcon"
          ></i>
        </button>
      </div>

      <div
        class="tvk-message-body-from-app"
        v-if="props.message!.author === MessageAuthor.app"
      >
        <div
          v-if="props.message!.type === MessageType.notification"
          class="tvk-message-notification"
          :class="['tvk-message-notification-' + props.message.style]"
        >
          {{ props.message.message }}
        </div>
        <div
          v-if="props.message!.type === MessageType.loader"
          class="tvk-message-loader"
        ></div>
        <div
          v-if="props.message!.type === MessageType.error"
          class="tvk-error-connection"
        >
          <i class="tvk-error-icon bi bi-exclamation-triangle"></i>
          {{ (props.message as ErrorMessage).text }}
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
