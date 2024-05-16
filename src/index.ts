import "./assets/scss/main.scss";

import { createApp, type App } from "vue";
import { createPinia } from "pinia";
import TvkApp from "@/App.vue";
import { tockEndpointKey } from "@/keys/app-keys";
import { appOptionsSingleton } from "@/utils/app-options-singleton";
import { appInitialization } from "@/utils/initialization";
import { useMainStore } from "@/stores/main-state";
import { appOptionsModel, type AppOptions } from "@/utils/app-options-model";

function renderChat(
  target: HTMLElement,
  tockEndPoint: string,
  options: AppOptions
): App<Element> {
  const app = createApp(TvkApp);

  app.provide(tockEndpointKey, tockEndPoint);

  appOptionsSingleton.clearInstance();
  appOptionsSingleton.setOptions(options);

  const pinia = createPinia();
  app.use(pinia);

  app.mount(target);
  appInitialization();

  return app;
}

function getTvkDefaultOptions(): AppOptions {
  return JSON.parse(JSON.stringify(appOptionsModel));
}

function getTvkCurrentOptions(): AppOptions {
  return JSON.parse(JSON.stringify(appOptionsSingleton.getOptions()));
}

function updateTvkOption(
  pathString: string,
  value: string | number | boolean
): void {
  const options = appOptionsSingleton.getOptions();
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
        options: AppOptions
      ) => App<Element>;
      getTvkDefaultOptions: () => AppOptions;
      getTvkCurrentOptions: () => AppOptions;
      updateTvkOption: (path: string, value: string | number | boolean) => void;
    };
  }
}

export {
  renderChat,
  getTvkDefaultOptions,
  getTvkCurrentOptions,
  updateTvkOption,
};
