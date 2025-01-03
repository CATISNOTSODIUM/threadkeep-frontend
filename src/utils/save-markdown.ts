import { Thread } from "../models";
import {marked} from "marked";
import html2pdf from "html2pdf.js"
import { githubStyle } from "./github-style.ts";

export const saveMarkdownAsRawText = (fileName, ThreadList: Thread[]) => {
    const content = ThreadList.map((thread) => `${thread.title}\n\n${thread.content}`).join('\n\n---\n\n')
    saveTextFile(fileName, content);
}


export const saveMarkdownAsMD = (fileName, ThreadList: Thread[]) => {
    const content = mergeContent(ThreadList);
    saveTextFile(fileName, content);
}


export function mergeContent(ThreadList) {
    return ThreadList.map((thread) => `# ${thread.title}\n\n${thread.content}`).join('\n\n---\n')
}

function saveTextFile(fileName, content) {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download =  fileName;
    document.body.appendChild(element);
    element.click();
}

function markdownToHTML(markdownString) {
  try {
    // Convert markdown to HTML
    // You can adjust the style based on the following output
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            ${githubStyle}
          </style>
        </head>
        <body>
          ${marked.parse(markdownString)}
        </body>
      </html>
    `;

    return htmlContent;

  } catch (error) {
    console.error('Error converting Markdown to PDF:', error);
    throw error;
  }
}