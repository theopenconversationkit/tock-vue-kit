import "./assets/scss/main.scss";

import App from "@/App.vue";
import { tockEndpointKey } from "@/keys/app-keys";
import type { appOptions } from "@/models/app-options";
import appOptionsSingleton from "@/utils/app-options";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { appInitialization } from "@/utils/initialization";

function renderChat(
  target: HTMLElement,
  tockEndPoint: string,
  options: appOptions
) {
  const app = createApp(App);

  app.provide(tockEndpointKey, tockEndPoint);

  appOptionsSingleton.clearInstance();
  appOptionsSingleton.getInstance(options);

  const pinia = createPinia();
  app.use(pinia);

  app.mount(target);
  appInitialization();

  return app;
}

declare global {
  interface Window {
    TockVueKit: {
      renderChat: (
        target: string,
        tockEndPoint: string,
        options: appOptions
      ) => any;
    };
  }
}

export { renderChat };