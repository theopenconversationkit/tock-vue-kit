import { type App } from "vue";
import { type AppOptions, type AppOptionsModel } from './utils/app-options-model';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options: AppOptions): App<Element>;
declare function getTvkDefaultOptions(): AppOptionsModel;
declare function getTvkCurrentOptions(): AppOptions;
declare function updateTvkOption(pathString: string, value: string | number | boolean): void;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: AppOptions) => App<Element>;
            getTvkDefaultOptions: () => AppOptionsModel;
            getTvkCurrentOptions: () => AppOptions;
            updateTvkOption: (path: string, value: string | number | boolean) => void;
        };
    }
}
export { renderChat, getTvkDefaultOptions, getTvkCurrentOptions, updateTvkOption, };
