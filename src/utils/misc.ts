/**
 * Simple object check.
 * @param value
 * @returns {boolean}
 */
export function isObject(value: any) {
  return !!(value && typeof value === "object" && !Array.isArray(value));
}
