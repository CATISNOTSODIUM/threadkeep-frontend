export const truncateBody = (
  content: string,
  maxCharacter = 400,
  convertCode = true
) => {
  if (!content) return content; // undefined content
  // replace markdown headers
  const markdownHeaderRegex = /^(#{1,6})\s*(.+?)$/gm;
  content = content.replace(markdownHeaderRegex, "$2 >");

  // convert every code snippet into <code>
  if (convertCode) {
    const codeSnippetRegex = /```([\s\S]*?)```/g;
    content = content.replace(codeSnippetRegex, (_, content) => {
      return " <code> ";
    });
  }

  // convert every image into <img>
  const imageRegex = /!\[([^\]]+)\]\(([^\)]+)\)/g;
  content = content.replace(imageRegex, " <img> ");
  // limit character numbers

  // remove unnecessary line breaks
  content = content
    .replace(/[\r\n]/g, "")
    .replace(/\s+/g, " ")
    .replace(/ >/g, ">")
    .replace(/> </g, "><")
    .trim();

  return content.slice(0, maxCharacter) + "...";
};

function extractUrlFromMDImage(text: string): string[] {
  // Regular expressions for different URL patterns
  const patterns = {
    // Matches markdown image syntax: ![alt](url)
    markdownImage: /!\[.*?\]\((.*?)\)/,
    // Matches plain URLs
    plainUrl: /(https?:\/\/[^\s,]+)/g
  };

  const urls = new Set<string>();

  // Extract URL from markdown image syntax
  const markdownMatch = text.match(patterns.markdownImage);
  if (markdownMatch && markdownMatch[1]) {
    urls.add(markdownMatch[1]);
  }

  // Extract plain URLs
  const plainMatches = text.match(patterns.plainUrl);
  if (plainMatches) {
    plainMatches.forEach(url => urls.add(url));
  }

  return Array.from(urls);
}

export function extractFirstImageUrl(content: string): string  {
  const imageRegex = /!\[([^\]]+)\]\(([^\)]+)\)/g;
  const allImages = [...content.matchAll(imageRegex)];
  if (allImages.length === 0) {
    return '';
  } else {
    const res = extractUrlFromMDImage(allImages[0].toString());
    return res.length === 0 ? '' : res[0];
  }
}