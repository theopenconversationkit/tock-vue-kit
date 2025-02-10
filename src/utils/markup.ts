import type { Tokens, TokenizerExtension, RendererExtension } from "marked";
import katex from "katex";

interface katexBlockToken extends Tokens.Generic {
  type: "katexBlock";
  raw: string;
  text: string;
  displayMode: true;
}

interface katexInlineToken extends Tokens.Generic {
  type: "katexInline";
  raw: string;
  text: string;
  displayMode: false;
}

export const katexBlockExtension: TokenizerExtension & RendererExtension = {
  name: "katexBlock",
  level: "block",

  start(src: string): number | undefined {
    const match = src.match(/(\${2}|\\\[)/);
    return match ? match.index : -1;
  },

  tokenizer(src: string): katexBlockToken | undefined {
    // 1) $$ ... $$
    const rule1 = /^\${2}([\s\S]+?)\${2}/;
    const match1 = rule1.exec(src);
    if (match1) {
      const token: katexBlockToken = {
        type: "katexBlock",
        raw: match1[0],
        text: match1[1].trim(),
        displayMode: true,
      };
      return token;
    }

    // 2) \[ ... \]
    const rule2 = /^\\\[([\s\S]+?)\\\]/;
    const match2 = rule2.exec(src);
    if (match2) {
      const token: katexBlockToken = {
        type: "katexBlock",
        raw: match2[0],
        text: match2[1].trim(),
        displayMode: true,
      };
      return token;
    }

    return undefined;
  },

  renderer(token) {
    if (token.type === "katexBlock") {
      return katex.renderToString(token.text, {
        throwOnError: false,
        displayMode: token.displayMode,
      });
    }

    return undefined;
  },
};

export const katexInlineExtension: TokenizerExtension & RendererExtension = {
  name: "katexInline",
  level: "inline",

  start(src: string): number | undefined {
    const match = src.match(/(\$|\\\()/);
    return match ? match.index : -1;
  },

  tokenizer(src: string): katexInlineToken | undefined {
    // 1) $...$
    const rule1 = /^\$([^$]+?)\$/;
    const match1 = rule1.exec(src);
    if (match1) {
      const token: katexInlineToken = {
        type: "katexInline",
        raw: match1[0],
        text: match1[1].trim(),
        displayMode: false,
      };
      return token;
    }

    // 2) \(...\)
    const rule2 = /^\\\(([\s\S]+?)\\\)/;
    const match2 = rule2.exec(src);
    if (match2) {
      const token: katexInlineToken = {
        type: "katexInline",
        raw: match2[0],
        text: match2[1].trim(),
        displayMode: false,
      };
      return token;
    }

    return undefined;
  },

  renderer(token) {
    if (token.type === "katexInline") {
      return katex.renderToString(token.text, {
        throwOnError: false,
        displayMode: token.displayMode,
      });
    }
    return undefined;
  },
};
