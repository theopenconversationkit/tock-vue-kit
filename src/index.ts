import "./assets/scss/main.scss";

import App from "@/App.vue";
import { tockEndpointKey } from "@/keys/app-keys";
import type { appOptions } from "@/models/app-options";
import { AppOptionsModel, appOptionsSingleton } from "@/utils/app-options";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { appInitialization } from "@/utils/initialization";
import { useMainStore } from "./stores/main-state";

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

function getTvkDefaultOptions() {
  return JSON.parse(JSON.stringify(AppOptionsModel));
}

function getTvkCurrentOptions() {
  return JSON.parse(JSON.stringify(appOptionsSingleton.getInstance().options));
}

function updateTvkOption(pathString: string, value: string | number | boolean) {
  const options = appOptionsSingleton.getInstance().options;
  const path = pathString.split(".");

  let pointer = options;
  for (let i = 0; i < path.length; i++) {
    const space = path[i];
    if (i < path.length - 1) {
      if ((pointer as any)[space]) {
        pointer = (pointer as any)[space];
      } else {
        console.warn("Non existing Tock Vue Kit option passed", space, path);
        break;
      }
    } else {
      (pointer as any)[space] = value;

      const mainStore = useMainStore();
      mainStore.updateApplication();
    }
  }
}

declare global {
  interface Window {
    TockVueKit: {
      renderChat: (
        target: string,
        tockEndPoint: string,
        options: appOptions
      ) => any;
      getTvkDefaultOptions: () => appOptions;
      getTvkCurrentOptions: () => appOptions;
      updateTvkOption: (path: string, value: string | number | boolean) => null;
    };
  }
}

export {
  renderChat,
  getTvkDefaultOptions,
  getTvkCurrentOptions,
  updateTvkOption,
};
