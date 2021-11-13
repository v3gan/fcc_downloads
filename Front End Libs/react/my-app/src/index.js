import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Calendar from './Calendar';
import reportWebVitals from './reportWebVitals';

//var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');

//const JSX = <h1>Hello JSX!</h1>;

// const ChildComponent = () => {
//   return (
//     <div>
//       <p>I am the child</p>
//     </div>
//   );
// }

// class ParentComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <h1>I am the parent</h1>
//         { /* Change code below this line */ }
//           <ChildComponent />

//         { /* Change code above this line */ }
//       </div>
//     );
//   }
// }

const pc = <Calendar />
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  pc,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
