// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Column } from "react-foundation";


// ---------------------- Components

import Header from "components/header";
import Footer from "components/footer";


// ******************************************************************
// ----------------------- Export
// ******************************************************************


// This is global page for all subpages.
// Home Page is treated as 'Landing' page because it has different 'header' in original plan

const Main = React.createClass({
  
  render(){
    
    var path = this.props.location.pathname;
 
    return(
      <div>
        
        {/* Header */}
        <Header />
        
        {/* Body */}
        <div className="l-page-container">
          <ReactCSSTransitionGroup component="div"
            transitionName="page"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>

            {React.cloneElement(this.props.children,{ ...this.props, key: path } )}

          </ReactCSSTransitionGroup>

        </div>
        
        {/* Footer */}
        <Footer />

      </div>
    )

  }

})

export default Main;