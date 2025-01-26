import { Thread } from "../models";

export const saveMarkdownAsRawText = (fileName, ThreadList: Thread[], filterStatus={
      "text": true,
      "image": true,
      "code": true
}) => {
    let content = ThreadList.map((thread) => `${thread.title}\n\n${thread.content}`).join('\n\n---\n\n')
    content = filterContent(content, filterStatus)
    saveTextFile(fileName, content);
}


export const saveMarkdownAsMD = (fileName, ThreadList: Thread[], filterStatus={
      "text": true,
      "image": true,
      "code": true
}) => {
    let content = mergeContent(ThreadList);
    content = filterContent(content, filterStatus)
    saveTextFile(fileName, content);
}

export const filterContent = (content, filterStatus) => {
  const convertCode = !filterStatus["code"]
  const convertImage = !filterStatus["image"]
  const removeText = !filterStatus["text"]

  if (!content) return content; // undefined content 

    // convert every code snippet into <code>
    if (convertCode) {
        const codeSnippetRegex = /```([\s\S]*?)```/g; //eslint-disable-line
        content = content.replace(codeSnippetRegex, (_, content) => {
            return " [code] ";
        });
    }
    
    // convert every image into <img>
    if (convertImage) {
      const imageRegex = /!\[([^\]]+)\]\(([^\)]+)\)/g; //eslint-disable-line
      content = content.replace(imageRegex, '  [img] ')
    }
    
    if (removeText) {
      const specialRegex = /```([\s\S]*?)```|!\[([^\]]+)\]\(([^\)]+)\)/g; //eslint-disable-line
      content = content.match(specialRegex)
      if (content !== null) content = content.join('\n')
    }

    return content
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
