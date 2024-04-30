import type { appOptions } from './models/app-options';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options: appOptions): any;
declare function getDefaultOptions(): any;
declare function getCurrentOptions(): any;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: appOptions) => any;
            getDefaultOptions: () => appOptions;
            getCurrentOptions: () => appOptions;
        };
    }
}
export { renderChat, getDefaultOptions, getCurrentOptions };
