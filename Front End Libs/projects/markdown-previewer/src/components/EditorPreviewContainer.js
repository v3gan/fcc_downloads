import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";

class EditorPreviewContainer extends React.Component {
    render() {
        return (
            <div className="w-50">
                <Editor />
                <Preview mdPreview="Rendered Markdown Here"/>
            </div>
        );
    }
}

export default EditorPreviewContainer;