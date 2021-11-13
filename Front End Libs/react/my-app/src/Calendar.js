import React from 'react';
import CurrentDate from "./CurrentDate";

class Calendar extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <h3>What date is it?</h3>
          { /* Change code below this line */ }
          <CurrentDate date={Date()} />
          { /* Change code above this line */ }
        </div>
      );
    }
  };

  export default Calendar;