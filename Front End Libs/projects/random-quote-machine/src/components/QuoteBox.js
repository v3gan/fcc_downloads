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
        this.getNewQuote = this.getNewQuote.bind(this);
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

    getNewQuote = () => {
        let quote = this.getQuote(this.state.allQuotes);
        this.setState(() => ({currentQuote: quote}));
    }
    render() {
        return(
            <div id="quote-box" className="w-50">
                <Text quoteText={this.state.currentQuote.quote}/>
                <Author author={this.state.currentQuote.author}/>
                <div className="d-flex justify-content-between mt-3">
                    <button id="new-quote" className="btn btn-primary" onClick={this.getNewQuote}>New Quote</button>
                    <a id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.currentQuote.quote + '" ' + this.state.currentQuote.author)} className="btn btn-primary" target="_top"><i className="fa fa-twitter"></i></a>
                </div>
            </div>
        );
    }
}

export default QuoteBox;