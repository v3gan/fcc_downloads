import React from "react";

class Author extends React.Component {
    render() {
        return (
            <div id="author" className="text-muted">
                {this.props.author}
            </div>
        );
    }
}

export default Author;