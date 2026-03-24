import type { MessageFootnote } from "../models/messages";

type FootnoteMetadata = {
  is_untitled?: boolean;
};

function getUntitledFlag(footnote: MessageFootnote): boolean {
  const metadata = footnote.metadata as FootnoteMetadata | undefined;
  return Boolean(metadata?.is_untitled);
}

export function isFootnoteUntitled(footnote: MessageFootnote): boolean {
  return getUntitledFlag(footnote);
}
