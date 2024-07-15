import { type App } from "vue";
import type { AppOptions, AppOptionsModel, DeepPartial } from './models/app-options-model';
import type { Message } from "./models/messages";
declare function renderChat(target: HTMLElement, tockEndPoint: string, options?: DeepPartial<AppOptions>): App<Element>;
declare function reload(tockEndPoint: string, options?: DeepPartial<AppOptions>): void;
declare function getTvkDefaultOptions(): AppOptionsModel;
declare function getTvkCurrentOptions(): AppOptions;
declare function updateTvkOption(pathString: string, value: string | number | boolean | undefined): void;
declare function addTvkMessage(message: Message): void;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: AppOptions) => App<Element>;
            reload: () => void;
            getTvkDefaultOptions: () => AppOptionsModel;
            getTvkCurrentOptions: () => AppOptions;
            updateTvkOption: (path: string, value: string | number | boolean | undefined) => void;
            addTvkMessage: (message: Message) => void;
        };
    }
}
export { renderChat, reload, getTvkDefaultOptions, getTvkCurrentOptions, updateTvkOption, addTvkMessage, };
