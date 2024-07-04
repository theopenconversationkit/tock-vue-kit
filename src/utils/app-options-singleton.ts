import { mergeDeep } from "@/utils/deep-merge";
import { isObject } from "./misc";
import { appOptionsModel } from "./app-options-model";
import type { AppOptions, DeepPartial } from "../models/app-options-model";

function isOptionDefinition(object: object): boolean {
  return (
    "type" in object &&
    "default" in object &&
    "title" in object &&
    "description" in object
  );
}

function extractDefaultAppOptions(
  object: any,
  target: { [key: string]: any } = {}
): AppOptions | undefined {
  if (isObject(object)) {
    if (isOptionDefinition(object)) {
      return object.default;
    } else {
      const entries = Object.entries(object);

      for (let i = 0; i < entries.length; i++) {
        const [objectKey, objectValue] = entries[i];
        target[objectKey] = extractDefaultAppOptions(objectValue);
      }
      return target as any;
    }
  }
}

export class appOptionsSingleton {
  private static instance: appOptionsSingleton | undefined;

  options: AppOptions;

  constructor(options: DeepPartial<AppOptions>) {
    const defaultOptions = extractDefaultAppOptions(appOptionsModel);

    this.options = mergeDeep(defaultOptions, options);
  }

  public static clearInstance(): void {
    if (appOptionsSingleton.instance) {
      appOptionsSingleton.instance = undefined;
    }
  }

  public static setOptions(options?: DeepPartial<AppOptions>): void {
    appOptionsSingleton.instance = new appOptionsSingleton(options!);
  }

  public static getOptions(): AppOptions {
    if (!appOptionsSingleton.instance) {
      throw new Error("No TVK instance avalaible.");
    }

    return appOptionsSingleton.instance.options;
  }
}
