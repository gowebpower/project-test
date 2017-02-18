// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { Row, Column } from "react-foundation";
import { Parallax } from 'react-parallax';
import Scrollbar from 'smooth-scrollbar'; 



// ---------------------- Components

import Footer from "components/footer";


// ******************************************************************
// ----------------------- Export
// ******************************************************************


 
 
console.log( Scrollbar )



class Home extends Component {


  componentWillMount() {}

  componentDidMount() {
 
    SmoothScroll({ 
      // Scrolling Core
      animationTime    : 400, // 400 [ms]
      stepSize         : 100, // 100 [px]
    });
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) === false) {
      andrzejdus.parallaxer.Parallaxer.start();
    }
    
    window.sr = ScrollReveal(); 
    if (sr.isSupported()) {
      document.documentElement.classList.add('sr');
    }
    sr.reveal('.sr-reveal', { delay: 100, mobile: false });
    sr.reveal('.sr-top', { delay: 100, origin: 'top', mobile: false });
    sr.reveal('.sr-left', { delay: 100, origin: 'left', mobile: false });
    sr.reveal('.sr-right', { delay: 100, origin: 'right', mobile: false });
 
  }

  componentWillUnmount() {}

  render(){

    return(
      
      <ReactCSSTransitionGroup component="div" transitionName="page" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
 
          <div className="l-page-container">
   
            <div className="m-home">
              
              <div className="m-home__bg-parallx stars" data-parallaxer="enabled" data-parallaxer-speed="-0.2"></div>
              <div className="m-home__bg-parallx cloud" data-parallaxer="enabled" data-parallaxer-speed="0.3"></div>
              <div className="m-home__bg-parallx moon" data-parallaxer="enabled" data-parallaxer-speed="0.4"></div>
              <div className="m-home__bg-parallx surface"></div>
              <div className="m-home__bg-parallx cloud-extra" data-parallaxer="enabled" data-parallaxer-speed="0.2"></div>
              <div className="m-home__bg-parallx cloud-extra2" data-parallaxer="enabled" data-parallaxer-speed="0.7"></div>
              
              <div className="m-home__container l-main-container">
     
                <Row className="l-row-container">
                  <Column small={12} className="">
                    
                    <div className="m-home-hero__logo icon-logo" data-parallaxer="enabled" data-parallaxer-speed="0.3"></div>

                    <h1 className="m-home-hero__title" data-parallaxer="enabled" data-parallaxer-speed="0.1" >The thrill of adventure</h1>
                    
                    <div className="m-home-hero__mouse-icon sr-top">
                      <img src="./client/images/home/mouse-icon.png" alt=""/>
                      <div className="m-home-hero__mouse-icon-arrow">
                        <div className="icon-arrow-down"></div>
                      </div>

                      <div className="m-home-hero__mouse-icon-arrow two">
                        <div className="icon-arrow-down"></div>
                      </div>
                    </div>

                    <div className="m-home-hero__quote" data-parallaxer="enabled" data-parallaxer-speed="0.3">“Capturing the struggles, dangers & amazing discoveries of exploring the unknown.”
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

                        <div className="m-home-links__logo icon-logo sr-top"></div>
                        <Link to="/join" activeClassName="active" className="m-home-links__title sr-top" data-parallaxer="enabled">JOINS US</Link>
                        <div className="m-home-links__text sr-top">It’s Dangerous to Go Alone - Come with Us!</div>

                      </div>

                    </div>

                  </Column>
                </Row>
              </div> {/* m-home__container ends*/}
  
            </div> {/* m-home ends*/}

            <Footer />
          </div>

      </ReactCSSTransitionGroup>

    )
  }
}


export default Home;
 