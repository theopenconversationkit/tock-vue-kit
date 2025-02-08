export function containsHTML(str: string): boolean {
  const a = document.createElement("div");
  a.innerHTML = str;

  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true;
  }

  return false;
}

export function containsMarkdownFormatting(input: string): boolean {
  const markdownPatterns = [
    /(\*\*.*?\*\*)|(\_\_.*?\_\_)/, // Bold
    /(\*.*?\*)|(\_.*?\_)/, // Italics
    /(`.*?`)/, // Inline code
    /(\!\[.*?\]\(.*?\))|(\[.*?\]\(.*?\))/, // Images and links
    /(\>\s.*?)/, // Blockquote
    /(\s*[-*+] .*)/, // Unordered list
    /(\s*\d+\.\s.*?)/, // Ordered list
    /(\[\^.*?\]:\s.*?)/, // Footnotes
    /(\s*`{3}.*?`{3})/s, // Fenced code blocks
    /(\s*~~~.*?~~~)/s, // Fenced code blocks (tilde)
    /(\|.*?\|(\|[-:]+[-|:]*)?(\|.*?\|)+)/, // Tables
  ];

  return markdownPatterns.some((pattern) => pattern.test(input));
}
