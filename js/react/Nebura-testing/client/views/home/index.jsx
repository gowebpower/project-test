import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';


const Home = () => {

  return(

    <ReactCSSTransitionGroup component="div"
      transitionName="page"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>

      <div className="m-home l-container">
        <div className="row l-row-container">
          <div className="small-12 columns">
            <h1> Home Page</h1>
            <Link to="/join" activeClassName="active">Join</Link>
          </div>
        </div>
      </div>

      <footer> 2017 Nexon Korea Corporation </footer>
       

    </ReactCSSTransitionGroup>

    
  );

}


export default Home;
 