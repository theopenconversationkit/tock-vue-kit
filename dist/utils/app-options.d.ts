import type { appOptions } from '../models/app-options';
export interface optionDefinition {
    type: "boolean" | "string" | "number" | "imageDef";
    default: boolean | string | number | undefined;
    title: string;
    description: string | undefined;
}
export interface AppOptionsModel {
    [key: string]: AppOptionsModel | optionDefinition;
}
export declare const AppOptionsModel: AppOptionsModel;
export declare class appOptionsSingleton {
    private static instance;
    options: appOptions;
    constructor(options: Partial<appOptions>);
    static clearInstance(): void;
    static getInstance(options?: appOptions): appOptionsSingleton;
}
