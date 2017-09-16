// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux'; // binding redux to react
import store, { history } from './store';
 

// ---------------------- Components

import Global from './views/_global/index';
import Home from './views/home/index.jsx';
// import Explore from './views/explore/index.jsx';
// import Adventures from './views/adventures/index.jsx';
import Join from './views/join/index.jsx';
// import DesignAssets from './views/design-assets/index.jsx';
import NotFound from './views/notFound/index.jsx';


// ---------------------- CSS

// Global
import 'global/main.scss';

// For Page Components
import 'pages/_components/main.scss'; 

// For Page Specific
import 'pages/home/main.scss'; 
import 'pages/join/main.scss';
import 'pages/explore/main.scss';




// ******************************************************************
// ----------------------- Export
// ******************************************************************


const onEnter = ( componentName ) => {
  setTimeout(function(){
    
    // Temp fix. Make sure the page goes top when Route is changed.
    window.scrollTo(0, 0);

    // Add Component name class to body.
    var $body;
    $body = document.querySelector('body');
      
    $body.className = componentName + '-page';
  }, 0)
}

const App = (
  <Provider store={store}>
    <Router history ={history}>
      <scrollbar>
        {/* Home Page */}
        <Route path="/" component={Home} onEnter={ ()=> onEnter('Home') }>
        
        </Route>

        {/* Sub Pages */}
        <Route path="/" component={Global}>

          {/* <Route path="Explore" component={Explore}></Route>*/}
          {/* <Route path="Adventures" component={Adventures}></Route>*/}
          <Route path="Join" component={Join} onEnter={ ()=> onEnter('Join') }></Route>
          {/* <Route path="DesignAssets" component={DesignAssets}></Route>*/}

          <Redirect from="*" to="/" />

        </Route>
        
      </scrollbar>
    </Router>
  </Provider>
)

render( App , document.getElementById('App'));
