// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // binding redux to react
import store, { history } from './store';
 

// ---------------------- Components

import Global from './views/_global/index';
import Home from './views/home/index.jsx';
import Explore from './views/explore/index.jsx';
import Adventures from './views/adventures/index.jsx';
import Join from './views/join/index.jsx';
import DesignAssets from './views/design-assets/index.jsx';
import NotFound from './views/notFound/index.jsx';


// ---------------------- CSS

// Global
import 'global/main.scss';

// For Page Components
import 'pages/_shared/main.scss'; 

// For Page Specific
import 'pages/home/main.scss'; 
import 'pages/join/main.scss';
import 'pages/explore/main.scss';




// ******************************************************************
// ----------------------- Export
// ******************************************************************


// Temp fix. Make sure the page goes top when Route is changed.
const onEnter = () => {
  window.scrollTo(0, 0);
}

const App = (
  <Provider store={store}>
    <Router history ={history}>
      
      {/* Home Page */}
      <Route path="/" component={Home} onEnter={onEnter}>
    
      </Route>

      {/* Sub Pages */}
      <Route path="/" component={Global}>

        <Route path="Explore" component={Explore}></Route>
        <Route path="Adventures" component={Adventures}></Route>
        <Route path="Join" component={Join} onEnter={onEnter}></Route>
        <Route path="DesignAssets" component={DesignAssets}></Route>
        <Route path="*" component={NotFound}></Route>

      </Route>

    </Router>
  </Provider>
)


render( App , document.getElementById('app'));



// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(
//   <div>Hello world</div>,
//   document.getElementById('app')
// );