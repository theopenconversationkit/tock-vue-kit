/**
 * Simple object check.
 * @param value
 * @returns {boolean}
 */
export function isObject(value: any) {
  return !!(value && typeof value === "object" && !Array.isArray(value));
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("unable to copy to clipboard", err);
    }
    document.body.removeChild(textarea);
  }
}
