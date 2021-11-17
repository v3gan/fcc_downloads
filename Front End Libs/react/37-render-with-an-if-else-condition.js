class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    let jsxH1;
    if(this.state.display){
      jsxH1 = <h1>Displayed!</h1>;
    } else {
      jsxH1 = '';
    }
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {jsxH1}
       </div>
    );
  }
};