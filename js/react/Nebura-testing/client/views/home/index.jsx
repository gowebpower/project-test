// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { Row, Column } from "react-foundation";


// ---------------------- Components

import Footer from "components/footer";


// ******************************************************************
// ----------------------- Export
// ******************************************************************

const Home = () => {

  return(
    
    <ReactCSSTransitionGroup component="div" transitionName="page" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>

      <div className="l-page-container">
        <div className="m-home l-main-container">
 
          <Row className="l-row-container">
            <Column small={12} className="">
              
              <div className="m-home-hero__logo icon-logo"></div>

              <h1 className="m-home-hero__title">The thrill of adventure</h1>
              
              <div className="m-home-hero__mouse-icon">
                <img src="./client/images/home/mouse-icon.png" alt=""/>
              </div>

              <div className="m-home-hero__quote">“Capturing the struggles, dangers & amazing discoveries of exploring the unknown.”
                <span>~ H.D.</span>
              </div>


              <div className="m-home-links">
              
              {/* For Phase 2 */}
              {/*  <div className="m-home-links__top left">
                  
                  <Link to="/join" activeClassName="active" className="m-home-links__title">EXPLORE</Link>
                  <div className="m-home-links__text">Chewin’ Gum & Creating Universes</div>

                </div>

                <div className="m-home-links__top right">
                  
                  <Link to="/join" activeClassName="active" className="m-home-links__title">EXPLORE</Link>
                  <div className="m-home-links__text">Chewin’ Gum & Creating Universes</div>

                </div>
                */}
                <div className="clearfix"></div>

                <div className="m-home-links__bottom">

                  <div className="m-home-links__logo icon-logo"></div>
                  <Link to="/join" activeClassName="active" className="m-home-links__title">JOINS US</Link>
                  <div className="m-home-links__text">It’s Dangerous to Go Alone - Come with Us!</div>

                </div>

              </div>

            </Column>
          </Row>
   
        </div>
        <Footer />

      </div>
    </ReactCSSTransitionGroup>
      
  );

}


export default Home;
 