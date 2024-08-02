<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useMainStore } from "../stores/main-state";
import { appOptionsSingleton } from "../utils/app-options-singleton";
import uploadFilesPreview from "./upload-files-preview.vue";
import { uploadFilesListHandler } from "../utils/upload-files";
import { MessageAuthor, MessageType } from "../models/messages";

const { files, addFiles, removeFile, removeAllFiles, uploadFiles } =
  uploadFilesListHandler();

const appOptions = appOptionsSingleton.getOptions();

const mainStore = useMainStore();

const maxChars = appOptions.preferences.questionBar.maxUserInputLength;

const input = ref<HTMLInputElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const typedChars = ref<string>("");

const dropZoneActive = ref<boolean>(false);

const uploadInProgress = ref<boolean>(false);

function handleClick(): void {
  if (input?.value) input.value.focus();
}

function nbTypedChars(): number {
  return typedChars.value.trim().length;
}

function userInputExceedLenth(): boolean {
  return nbTypedChars() > maxChars;
}

function onSubmit(): void {
  if (nbTypedChars() && !userInputExceedLenth()) {
    mainStore.sendUserMessage(typedChars.value);
    if (appOptions.preferences.questionBar.clearTypedCharsOnSubmit) {
      typedChars.value = "";
    }
  }
}

function onClearHistory(): void {
  mainStore.clearHistory();
}

function onUploadFiles(): void {
  uploadInProgress.value = true;
  uploadFiles().then((res) => {
    let message =
      appOptions.wording.questionBar.uploadFilesList
        .fileUploadConfirmationMessage;

    let errors: string[] = [];
    res.forEach((fu) => {
      if (fu.status === "rejected") {
        errors.push(`"${fu.reason}"`);
      }
    });

    if (errors.length) {
      message = `${
        appOptions.wording.questionBar.uploadFilesList
          .fileUploadConfirmationMessageWithErrors
      } ${errors.join(", ")}`;
    }

    removeAllFiles();
    uploadInProgress.value = false;

    mainStore.addMessage({
      type: MessageType.info,
      author: MessageAuthor.app,
      date: Date.now(),
      text: message,
    });
  });
}

function onCancelUpload(): void {
  removeAllFiles();
}

function onOpenFileBrowser(): void {
  fileInput.value?.click();
}

function onFileInputChanged(e: Event): void {
  if (!appOptions.preferences.questionBar.uploadFiles.allow) return;

  const target = e.target as HTMLInputElement;
  if (target && target.files) {
    addFiles(target.files);
  }
}

function onDrop(e: DragEvent): void {
  if (
    !appOptions.preferences.questionBar.uploadFiles.allow ||
    uploadInProgress.value
  )
    return;

  setDropZoneInactive();

  if (e.dataTransfer) {
    addFiles(e.dataTransfer.files);
  }
}

function preventDefaults(e: Event): void {
  e.preventDefault();
}

let dropZoneInActiveTimeout: number;

function setDropZoneActive(): void {
  if (!appOptions.preferences.questionBar.uploadFiles.allow) return;

  dropZoneActive.value = true;
  clearTimeout(dropZoneInActiveTimeout);
}
function setDropZoneInactive(): void {
  if (!appOptions.preferences.questionBar.uploadFiles.allow) return;

  dropZoneInActiveTimeout = setTimeout(() => {
    dropZoneActive.value = false;
  }, 50);
}

const dragDropEvents: string[] = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  if (appOptions.preferences.questionBar.uploadFiles.allow) {
    dragDropEvents.forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults);
    });
  }
});

onUnmounted(() => {
  if (appOptions.preferences.questionBar.uploadFiles.allow) {
    dragDropEvents.forEach((eventName) => {
      document.body.removeEventListener(eventName, preventDefaults);
    });
  }
});
</script>

<template>
  <div
    class="tvk-question-bar"
    @click="handleClick"
    @drop.prevent="onDrop"
    @dragenter.prevent="setDropZoneActive"
    @dragover.prevent="setDropZoneActive"
    @dragleave.prevent="setDropZoneInactive"
    :data-active="dropZoneActive"
  >
    <uploadFilesPreview
      v-if="files.length"
      :files="files"
      :uploadInProgress="uploadInProgress"
      @remove="removeFile"
      @cancel="onCancelUpload"
      @upload="onUploadFiles"
    ></uploadFilesPreview>

    <template v-if="!files.length">
      <button
        v-if="appOptions.preferences.questionBar.clearHistory?.display"
        class="tvk-btn tvk-question-bar-btn-clear-history"
        :aria-label="appOptions.wording.questionBar.clearHistoryAriaLabel"
        @click="onClearHistory"
      >
        <i
          v-if="
            !appOptions.preferences.questionBar.clearHistory.image &&
            appOptions.preferences.questionBar.clearHistory.icon
          "
          :class="appOptions.preferences.questionBar.clearHistory.icon"
        ></i>

        <img
          v-if="appOptions.preferences.questionBar.clearHistory.image"
          :src="appOptions.preferences.questionBar.clearHistory.image.src"
          :style="{
            width: appOptions.preferences.questionBar.clearHistory.image.width,
            height:
              appOptions.preferences.questionBar.clearHistory.image.height,
          }"
        />
        {{ appOptions.wording.questionBar.clearHistory }}
      </button>

      <form @submit.prevent="onSubmit" class="tvk-question-bar-form">
        <input
          ref="input"
          type="text"
          class="tvk-question-bar-input"
          rows="1"
          :maxlength="appOptions.preferences.questionBar.maxUserInputLength"
          :placeholder="appOptions.wording.questionBar.input.placeholder"
          v-model="typedChars"
        />

        <div class="tvk-question-bar-chars-count">
          {{ nbTypedChars() }}/{{ maxChars }}
        </div>
      </form>

      <button
        v-if="
          appOptions.preferences.questionBar.uploadFiles.allow &&
          appOptions.preferences.questionBar.uploadFiles.displayButton
        "
        class="tvk-btn tvk-question-bar-btn-upload-files"
        :aria-label="appOptions.wording.questionBar.uploadBrowseButtonAriaLabel"
        @click="onOpenFileBrowser"
      >
        <i
          v-if="
            !appOptions.preferences.questionBar.uploadFiles.image &&
            appOptions.preferences.questionBar.uploadFiles.icon
          "
          :class="appOptions.preferences.questionBar.uploadFiles.icon"
        ></i>

        <img
          v-if="appOptions.preferences.questionBar.uploadFiles.image"
          :src="appOptions.preferences.questionBar.uploadFiles.image.src"
          :style="{
            width: appOptions.preferences.questionBar.uploadFiles.image.width,
            height: appOptions.preferences.questionBar.uploadFiles.image.height,
          }"
        />
        {{ appOptions.wording.questionBar.uploadBrowseButtonLabel }}
      </button>

      <input
        type="file"
        class="file-input"
        ref="fileInput"
        :multiple="appOptions.preferences.questionBar.uploadFiles.maxFiles > 1"
        @change="onFileInputChanged"
        v-if="
          appOptions.preferences.questionBar.uploadFiles.allow &&
          appOptions.preferences.questionBar.uploadFiles.displayButton
        "
      />

      <button
        :disabled="!typedChars.trim().length || userInputExceedLenth()"
        class="tvk-btn tvk-question-bar-btn-submit"
        :aria-label="appOptions.wording.questionBar.submitAriaLabel"
        @click="onSubmit"
      >
        <i
          v-if="
            !appOptions.preferences.questionBar.submit.image &&
            appOptions.preferences.questionBar.submit.icon
          "
          :class="appOptions.preferences.questionBar.submit.icon"
        ></i>

        <img
          v-if="appOptions.preferences.questionBar.submit.image"
          :src="appOptions.preferences.questionBar.submit.image.src"
          :style="{
            width: appOptions.preferences.questionBar.submit.image.width,
            height: appOptions.preferences.questionBar.submit.image.height,
          }"
        />
        {{ appOptions.wording.questionBar.submit }}
      </button>
    </template>
  </div>
</template>

<style>
.file-input {
  display: none;
}
</style>
