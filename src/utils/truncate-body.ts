export const truncateBody = (content: string, maxCharacter = 400, convertCode = true) => {
    if (!content) return content; // undefined content 
    // replace markdown headers 
    const markdownHeaderRegex = /^(#{1,6})\s*(.+?)$/gm;
    content = content.replace(markdownHeaderRegex, '$2 >');

    // convert every code snippet into <code>
    if (convertCode) {
        const codeSnippetRegex = /```([\s\S]*?)```/g;
        content = content.replace(codeSnippetRegex, (_, content) => {
            return " <code> ";
        });
    }
    
    // convert every image into <img>
    const imageRegex = /!\[([^\]]+)\]\(([^\)]+)\)/g;
    content = content.replace(imageRegex, ' <img> ')
    // limit character numbers

     // remove unnecessary line breaks
    content = content.replace(/[\r\n]/g, '').replace(/\s+/g, ' ').replace(/ >/g, '>').replace(/> </g, '><').trim()

    return content.slice(0, maxCharacter) + "...";
}