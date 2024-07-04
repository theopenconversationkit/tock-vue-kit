import { type App } from "vue";
import type { AppOptions, AppOptionsModel, DeepPartial } from './models/app-options-model';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options?: DeepPartial<AppOptions>): App<Element>;
declare function reload(tockEndPoint: string, options?: DeepPartial<AppOptions>): void;
declare function getTvkDefaultOptions(): AppOptionsModel;
declare function getTvkCurrentOptions(): AppOptions;
declare function updateTvkOption(pathString: string, value: string | number | boolean | undefined): void;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: AppOptions) => App<Element>;
            getTvkDefaultOptions: () => AppOptionsModel;
            getTvkCurrentOptions: () => AppOptions;
            updateTvkOption: (path: string, value: string | number | boolean | undefined) => void;
            reload: () => void;
        };
    }
}
export { renderChat, getTvkDefaultOptions, getTvkCurrentOptions, updateTvkOption, reload, };
