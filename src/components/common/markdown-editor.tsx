import * as React from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownHandler({ content, setContent }) {
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
  );
}
