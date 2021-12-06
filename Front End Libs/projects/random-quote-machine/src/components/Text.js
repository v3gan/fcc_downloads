import React from "react";

class Text extends React.Component {
    render() {
        return (
            <div id="text">
                {this.props.quoteText}
            </div>);
    }
}

export default Text;