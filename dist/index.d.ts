import type { appOptions } from './models/app-options';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options: appOptions): any;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: appOptions) => any;
        };
    }
}
export { renderChat };
