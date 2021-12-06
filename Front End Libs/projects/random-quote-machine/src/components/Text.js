import React from "react";

class Text extends React.Component {
    render() {
        return (
            <div id="text" className="fs-1 fw-bold">
                {this.props.quoteText}
            </div>
        );
    }
}

export default Text;