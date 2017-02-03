import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

  

const Main = React.createClass({
  
  render(){
    
    var path = this.props.location.pathname;

 
    return(
      <div>
        <h1>
          <Link to="/">Home</Link>
          <Link to="/explore" activeClassName="active">Explore</Link>
          <Link to="/adventures" activeClassName="active">Adventures</Link>
          <Link to="/join" activeClassName="active">Join Us</Link>
        </h1>
        
        <div className="l-page-container">
          <ReactCSSTransitionGroup component="div"
            transitionName="page"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>

            {React.cloneElement(this.props.children,{ ...this.props, key: path , aaa:'asdasd', } )}

          </ReactCSSTransitionGroup>
        </div>

      </div>
    )

  }

})

export default Main;