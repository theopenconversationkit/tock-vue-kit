import type { appOptions } from './models/app-options';
declare function renderChat(target: HTMLElement, tockEndPoint: string, options: appOptions): void;
declare global {
    interface Window {
        TockVueKit: {
            renderChat: (target: string, tockEndPoint: string, options: appOptions) => void;
        };
    }
}
export { renderChat };
