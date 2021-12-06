import React from "react";
import Text from "./Text";
class QuoteBox extends React.Component {
    render() {
        return(
        <div id="quote-box">
            <Text quoteText="Hello, World" />
        </div>
        );
    }
}

export default QuoteBox;