import React from "react";
import logo from '../logo.svg';
import { marked } from 'marked';

marked.setOptions({
    breaks: true
});

// add target="_blank" to rendered links
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`;

const placeholder = `# heading element (H1 size)

## a sub heading element (H2 size)

[a link](https://www.freecodecamp.org)

\`<div>Inline Code</div>\`

\`\`\`
// multi-line code
\`\`\`

- a list item

> a block quote


**bolded text**

![an image](${logo})
`;

class EditorPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mdRaw: placeholder,
            mdPreview: {
                __html: marked(placeholder, {renderer: renderer})
            }
        }
        this.renderPreview = this.renderPreview.bind(this);
    }

    renderPreview(event) {        
        let mdParsed = {
            __html: marked(event.target.value, {renderer: renderer})
        };
        this.setState({
            mdRaw: event.target.value,
            mdPreview: mdParsed
        });
    }

    render() {
        return (
            <div className="w-50">
                <div className="m-auto w-75">
                    <div className="w-100 card">
                    <div className="card-header"><h3>Markdown Editor</h3></div>
                        <div className="card-body">
                            <textarea id="editor" className="w-100" onChange={this.renderPreview} value={this.state.mdRaw}></textarea>
                        </div>
                    </div>
                    <div className="w-100 card mt-3">
                        <div className="card-header"><h3>Preview</h3></div>
                        <div className="card-body">
                            <div id="preview" className="border border-dark" dangerouslySetInnerHTML={this.state.mdPreview}>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditorPreview;