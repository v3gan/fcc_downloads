import React from "react";
import Text from "./Text";
import Author from "./Author";
class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allQuotes: [],
            currentQuote: {
                quote: '',
                author: ''
            }
        }
    }
    componentDidMount() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result.quotes)
                    this.setState({
                        isLoaded: true,
                        allQuotes: result.quotes,
                        currentQuote: this.getQuote(result.quotes)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    
    getRandomQuote = (quotes) => {
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        return randomQuote;
    }

    getQuote = (quotes) => {
        let randomQuote = this.getRandomQuote(quotes);
        return randomQuote;
    }

    render() {
        return(
            <div id="quote-box">
                <Text quoteText={this.state.currentQuote.quote}/>
                <Author author={this.state.currentQuote.author}/>
                <div className="d-flex justify-content-between mt-3">
                    <button id="new-quote" className="btn btn-primary">New Quote</button>
                    <a id="tweet-quote" href="twitter.com/intent/tweet" className="btn btn-primary">Tweet</a>
                </div>
            </div>
        );
    }
}

export default QuoteBox;