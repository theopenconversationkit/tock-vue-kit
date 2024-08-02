import { ref } from "vue";
import { appOptionsSingleton } from "@/utils/app-options-singleton";
import { useMainStore } from "../stores/main-state";

export enum FileUploadStatus {
  pending = "pending",
  loading = "loading",
  error = "error",
  completed = "completed",
}

const allowedFilesTypes = [
  { label: "json", mimetype: "application/json" },
  { label: "csv", mimetype: "text/csv" },
  { label: "html", mimetype: "text/html" },
  { label: "pdf", mimetype: "application/pdf" },
  { label: "txt", mimetype: "text/plain" },
  { label: "rtf", mimetype: "application/rtf" },
  { label: "odt", mimetype: "application/vnd.oasis.opendocument.text" },
  { label: "doc", mimetype: "application/msword" },
  {
    label: "docx",
    mimetype:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
];

export class UploadableFile {
  file: File;
  name: string;
  size: number;
  sizeAllowed: boolean;
  mimetype: string;
  typeAllowed: boolean;
  typelabel: string | undefined;
  id: string;
  url: string;
  status: FileUploadStatus;

  constructor(file: File) {
    const appOptions = appOptionsSingleton.getOptions();
    this.file = file;
    this.name = file.name;
    this.size = file.size;
    this.sizeAllowed =
      file.size <= appOptions.preferences.questionBar.uploadFiles.maxFileSize;

    this.mimetype = file.type;
    const supportedType = allowedFilesTypes.find(
      (aft) => aft.mimetype === file.type
    );
    this.typeAllowed = !!supportedType;
    this.typelabel = supportedType?.label;

    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = FileUploadStatus.pending;
  }
}

export function uploadFilesListHandler() {
  const mainStore = useMainStore();
  const appOptions = appOptionsSingleton.getOptions();
  const files = ref<UploadableFile[]>([]);

  function addFiles(newFiles: FileList) {
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));

    files.value = files.value.concat(newUploadableFiles);
  }

  function fileExists(otherId: string) {
    return files.value.some(({ id }) => id === otherId);
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  }

  function removeAllFiles() {
    files.value = [];
  }

  function uploadFiles() {
    files.value = files.value.filter((file) => {
      return file.sizeAllowed && file.typeAllowed;
    });

    if (
      files.value.length >
      appOptions.preferences.questionBar.uploadFiles.maxFiles
    ) {
      files.value.length =
        appOptions.preferences.questionBar.uploadFiles.maxFiles;
    }

    return Promise.allSettled(
      files.value.map((file) => mainStore.postFile(file))
    );
  }

  return { files, addFiles, removeFile, removeAllFiles, uploadFiles };
}
