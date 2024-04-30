<script setup lang="ts">
import { MessageAuthor, MessageType } from "../models/messages";

import { appOptionsSingleton } from "../utils/app-options";

const appOptions = appOptionsSingleton.getInstance().options;

const props = defineProps({ message: Object });
</script>

<template>Image type not yet implemented</template>
