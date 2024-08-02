<script setup lang="ts">
import { appOptionsSingleton } from "../utils/app-options-singleton";
import { humanFileSize } from "../utils/misc";
import type { UploadableFile } from "../utils/upload-files";
import { FileUploadStatus } from "../utils/upload-files";

const appOptions = appOptionsSingleton.getOptions();

const props = defineProps<{
  files: UploadableFile[];
  uploadInProgress: boolean;
}>();

defineEmits(["remove", "cancel", "upload"]);

function uploadPossible() {
  return props.files.some((file) => {
    return file.typeAllowed && file.sizeAllowed;
  });
}
</script>

<template>
  <div class="tvk-upload-files-preview-wrapper">
    <ul class="tvk-upload-files-preview-body">
      <li
        v-for="(file, index) in files"
        class="tvk-upload-file-preview"
        :class="{
          'not-allowed':
            !file.typeAllowed ||
            !file.sizeAllowed ||
            index >= appOptions.preferences.questionBar.uploadFiles.maxFiles,
        }"
      >
        <div class="tvk-upload-file-preview-infos">
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-exclamation-triangle-fill warning"
            v-if="!file.typeAllowed || file.status === FileUploadStatus.error"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-file-arrow-up"
            v-else-if="file.status === FileUploadStatus.loading"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-check-lg"
            v-else-if="file.status === FileUploadStatus.completed"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-pdf"
            v-else-if="file.typelabel === 'pdf'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-json"
            v-else-if="file.typelabel === 'json'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-csv"
            v-else-if="file.typelabel === 'csv'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-html"
            v-else-if="file.typelabel === 'html'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-txt"
            v-else-if="file.typelabel === 'txt'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-txt"
            v-else-if="file.typelabel === 'rtf'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-doc"
            v-else-if="file.typelabel === 'odt'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-doc"
            v-else-if="file.typelabel === 'doc'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-filetype-docx"
            v-else-if="file.typelabel === 'docx'"
          ></i>
          <i
            class="tvk-upload-file-preview-infos-fileIcon bi bi-file-x"
            v-else
          ></i>

          {{ file.status }}
          <span class="tvk-upload-file-preview-infos-fileName">{{
            file.name
          }}</span>
          <small class="tvk-upload-file-preview-infos-fileSize"
            >({{ humanFileSize(file.size) }})</small
          >

          <div
            v-if="
              index >= appOptions.preferences.questionBar.uploadFiles.maxFiles
            "
          >
            <small class="warning">
              {{
                appOptions.wording.questionBar.uploadFilesList
                  .filesNumberLimitWarning
              }}
              {{ appOptions.preferences.questionBar.uploadFiles.maxFiles }}
            </small>
          </div>

          <div v-else-if="!file.sizeAllowed">
            <small class="warning">
              {{
                appOptions.wording.questionBar.uploadFilesList.filesSizeWarning
              }}
              (max file size
              {{
                humanFileSize(
                  appOptions.preferences.questionBar.uploadFiles.maxFileSize
                )
              }})
            </small>
          </div>

          <div v-else-if="!file.typeAllowed">
            <small class="warning">
              {{
                appOptions.wording.questionBar.uploadFilesList
                  .filesFormatWarning
              }}
            </small>
          </div>
        </div>

        <button
          v-if="file.status === FileUploadStatus.pending"
          @click="$emit('remove', file)"
          class="tvk-btn tvk-upload-files-preview-remove"
        >
          &times;
        </button>

        <div
          class="status-indicator loading"
          v-show="file.status === FileUploadStatus.loading"
        >
          {{ appOptions.wording.questionBar.uploadFilesList.fileUploadLoading }}
        </div>
        <div
          class="status-indicator success"
          v-show="file.status === FileUploadStatus.completed"
        >
          {{
            appOptions.wording.questionBar.uploadFilesList.fileUploadCompleted
          }}
        </div>
        <div
          class="status-indicator warning"
          v-show="file.status === FileUploadStatus.error"
        >
          {{ appOptions.wording.questionBar.uploadFilesList.fileUploadError }}
        </div>
      </li>
    </ul>

    <div class="tvk-upload-files-preview-footer">
      <div class="tvk-upload-files-preview-footer-actions">
        <button
          class="tvk-btn"
          @click="$emit('cancel')"
          :disabled="uploadInProgress"
        >
          {{ appOptions.wording.questionBar.uploadFilesList.uploadCancel }}
        </button>
        <button
          class="tvk-btn tvk-btn-action"
          @click="$emit('upload')"
          :disabled="!uploadPossible() || uploadInProgress"
        >
          {{ appOptions.wording.questionBar.uploadFilesList.uploadSubmit }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
