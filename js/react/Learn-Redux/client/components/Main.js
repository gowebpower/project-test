import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

  

const Main = React.createClass({
  
  render(){
    
    var path = this.props.location.pathname;

 
    return(
      <div>
        <h1>
          <Link to="/">.</Link>
        </h1>
        
        <ReactCSSTransitionGroup component="div"
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          {React.cloneElement(this.props.children,{ ...this.props, key: path , aaa:'asdasd', } )}

        </ReactCSSTransitionGroup>

      </div>
    )

  }

})

export default Main;