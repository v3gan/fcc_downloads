import React from "react";

class Preview extends React.Component {
    render() {
        return (
            <div id="preview" className="m-auto w-75">
                {this.props.mdPreview}
            </div>
        )
    }
}

export default Preview