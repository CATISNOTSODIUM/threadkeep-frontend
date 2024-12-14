import * as React from 'react';
import MDEditor, { commands, ICommand, TextState, TextAreaTextApi } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import domToImage from "dom-to-image";

export default function MarkdownHandler ({content, setContent}) {
    return (
        <div>
            
             <MDEditor
                value={content}
                onChange={setContent}
                visibleDragbar={false}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
        </div>
    )
}
