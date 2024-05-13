import type { appOptions } from './models/app-options';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options: appOptions): any;
declare function getTvkDefaultOptions(): any;
declare function getTvkCurrentOptions(): any;
declare function updateTvkOption(pathString: string, value: string | number | boolean): void;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: appOptions) => any;
            getTvkDefaultOptions: () => appOptions;
            getTvkCurrentOptions: () => appOptions;
            updateTvkOption: (path: string, value: string | number | boolean) => null;
        };
    }
}
export { renderChat, getTvkDefaultOptions, getTvkCurrentOptions, updateTvkOption, };
