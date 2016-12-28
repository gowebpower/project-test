/*
  ###  Initial React imports
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers'; // For React Redux States
import App from './components/app';


// const createStoreWithMiddleware = applyMiddleware()(createStore); // whats this?


// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>
//   , document.querySelector('.container')
// );

//-----------------------------------




function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
 

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

class LoginControl extends React.Component {
  

  constructor(props){
    super(props);

    this.state = { isLoggedIn: false };

  }


  buttonEvent = () => {

    this.setState( (prevState) => ({

      isLoggedIn: !prevState.isLoggedIn

    }));
 
  }

  render(){

    var isLoggedIn = this.state.isLoggedIn;

    var button = null;

    if( isLoggedIn ){

      button = <LogoutButton onClick = { this.buttonEvent } />

    } else {

      button = <LoginButton onClick = { this.buttonEvent } />

    }


    return(

      <div>
        <Greeting isLoggedIn= { isLoggedIn } />
        { button }
      </div>
      
    )

  }







}
 


ReactDOM.render(

  <LoginControl  />
  , document.querySelector('.container')
)















//-----------------------------------

 


// function Clock(p){

//   return(
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is { p.date }.</h2>
//     </div>
//   )

// }


// function render(){

//   ReactDOM.render(
//     <Clock date={ new Date().toLocaleTimeString() } />,
//     document.querySelector('.container')
//   );

// }


// setIntrval( render, 1000 );




// class Clock extends Component {

//   constructor(props){
//     super(props);
//     this.state = { date: new Date().toLocaleTimeString() };
//   }

//   componentDidMount() {
//     this.timerID = setInterval(
//       () => { this.thick() }, 1000

//     )
//   }

//   thick(){

//     this.setState({ date: new Date().toLocaleTimeString() });

//   }



//   render(){

//     return(
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is { this.state.date }.</h2>
//       </div>
//     )

//   }

// }


// function App(){

//   return(
//     <div>
//       <Clock />
//       <Clock />
//       <Clock />
//     </div>
//   )
// }

// function render(){

//   ReactDOM.render(
//     <App />,
//     document.querySelector('.container')
//   );

// }

// render();
