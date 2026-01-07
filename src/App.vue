<script setup lang="ts">
import "tock-vue-kit/dist/style.css";
import "tock-vue-kit-editor/dist/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "katex/dist/katex.min.css";
import { renderChat } from "tock-vue-kit";
import { TvkEditor } from "tock-vue-kit-editor";
import { ref, onMounted, watch } from "vue";

const chatTarget = ref<HTMLElement>();

const displayEditor = ref<boolean>(false);

const darkTheme = ref<boolean>(false);

enum DisplayModes {
  default = "default",
  home = "home",
  floating = "floating",
}
const displayMode = ref<DisplayModes>(DisplayModes.default);

watch(displayEditor, async (newState) => {
  if (newState) {
    document.body.classList.add("with-editor");
  } else {
    document.body.classList.remove("with-editor");
  }
});

watch(darkTheme, async (newState) => {
  if (newState) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
});

onMounted(() => {
  // renderChat(chatTarget.value!, "https://demo-bot.tock.ai/io/tock/tockbot/web");
  renderChat(
    chatTarget.value!,
    "http://localhost:8080/io/app/new_assistant/web",
    {
      localStorage: {
        enabled: true,
      },
    }
  );

  // setTimeout(() => {
  //   displayEditor.value = true;
  // }, 100);

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
    darkTheme.value = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.setAttribute("data-bs-theme", "light");
    darkTheme.value = false;
  }
});
</script>

<template>
  <nav class="header">
    <ul>
      <li class="app-brand">Tock<span class="alt">VueKit</span>Studio</li>
    </ul>
    <ul>
      <li>
        <fieldset class="no-margin">
          <input
            type="radio"
            id="default"
            name="displayMode"
            :value="DisplayModes.default"
            v-model="displayMode"
          />
          <label htmlFor="default">default</label>
          <input
            type="radio"
            id="home-page"
            name="displayMode"
            :value="DisplayModes.home"
            v-model="displayMode"
          />
          <label htmlFor="home-page">home page</label>
          <input
            type="radio"
            id="floating"
            name="displayMode"
            :value="DisplayModes.floating"
            v-model="displayMode"
          />
          <label htmlFor="floating">floating</label>
        </fieldset>
      </li>

      <li>
        <label class="no-margin">
          <input
            id="dark"
            name="dark"
            type="checkbox"
            role="switch"
            v-model="darkTheme"
          />
          dark mode
        </label>
      </li>

      <li>
        <label class="no-margin">
          <input
            id="editor"
            name="editor"
            type="checkbox"
            role="switch"
            v-model="displayEditor"
          />
          editor
        </label>
      </li>
    </ul>
  </nav>

  <main class="container h-100">
    <div :class="displayMode">
      <div v-if="displayMode === DisplayModes.home">
        <h1 class="app-brand no-margin">
          Tock<span class="alt">VueKit</span>Studio
        </h1>
        <blockquote no-margin class="no-margin blockquote-offset">
          The customizable Vue 3 client for Tock, the open source conversational
          AI toolkit.
        </blockquote>
      </div>
      <div ref="chatTarget"></div>
    </div>

    <div v-if="displayMode === DisplayModes.floating">
      <h3>Lorem ipsum dolor sit amet</h3>
      <p v-for="n in 3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies
        sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius
        a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
        molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium
        a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra
        tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.
        Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit
        sodales. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
        pellentesque fermentum. Maecenas adipiscing ante non diam sodales
        hendrerit.
        <br /><br />
        Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci
        vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula
        non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros
        vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.
        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit
        lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien.
        Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam.
        Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum
        posuere, metus purus iaculis lectus, et tristique ligula justo vitae
        magna.
        <br /><br />
        Aliquam convallis sollicitudin purus. Praesent aliquam, enim at
        fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu
        lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod
        libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean
        suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla
        tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus,
        felis magna fermentum augue, et ultricies lacus lorem varius purus.
        Curabitur eu amet.
      </p>
    </div>
  </main>

  <aside class="editor" v-if="displayEditor">
    <TvkEditor></TvkEditor>
  </aside>
</template>

<style scoped>
.blockquote-offset {
  margin-left: 6px !important;
}
</style>

<style>
:root {
  /* --tvk_colors_dark_background: transparent;
  --tvk_colors_light_background: transparent;
  --tvk_colors_light_neutral: hsl(var(--tvk_colors_brand-hue) 0% 97%);
  --tvk_colors_light_neutral-dim: hsl(var(--tvk_colors_brand-hue) 5% 88%);
  --tvk_colors_light_text1: hsl(var(--tvk_colors_brand-hue) 0% 10%);
  --tvk_colors_light_text2: hsl(var(--tvk_colors_brand-hue) 0% 30%);
  --tvk_message_answer_bot_background: var(--tvk_colors_light_neutral);
  --tvk_message_answer_bot_border-bottom: 1px solid
    var(--tvk_colors_light_neutral-dim);
  --tvk_message_answer_bot_border-top: 1px solid
    var(--tvk_colors_light_neutral-dim);
  --tvk_message_answer_bot_padding: 1em;
  --tvk_message_answer_flex-direction: row;
  --tvk_message_answer_flex-wrap: nowrap;
  --tvk_message_answer_user_align-items: start;
  --tvk_message_answer_user_justify-content: start;
  --tvk_message_answer_user_padding: 1em;
  --tvk_message_body_bot_background: unset;
  --tvk_message_body_user_background: unset;
  --tvk_message_header_avatar_padding: 0em;
  --tvk_message_header_avatar_radius: unset;
  --tvk_message_header_avatar_user_color: var(--tvk_colors_neutral);
  --tvk_message_header_margin: 0em;
  --tvk_message_margin: 0em; */

  /* --tvk_colors_brand-hue: 201;
  --tvk_colors_brand-lightness: 34%;
  --tvk_colors_brand-saturation: 99%;
  --tvk_base_font-size: 0.9em;
  --tvk_footnotes_align-items: start;
  --tvk_footnotes_flex-direction: column;
  --tvk_footnotes_margin: 1.5em 0 0 0;
  --tvk_wrapper_border-radius: 20px;
  --tvk_wrapper_height: calc(100vh - 16em);
  --tvk_wrapper_max-height: calc(100vh - 16em);
  --tvk_wrapper_padding: 2em; */
}
</style>
