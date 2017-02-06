import React from 'react';
import { render } from 'react-dom';

// Import CSS
import 'global/main.scss';
import 'pages/home/main.scss';
import 'pages/join/main.scss';
import 'pages/_shared/main.scss';


// Import Views
import Global from './views/_global/index';
import Home from './views/home/index';
import Explore from './views/explore/index';
import Adventures from './views/adventures/index';
import Join from './views/join/index';
import NotFound from './views/notFound/index';

// Import react Router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // binding redux to react
import store, { history } from './store';


const app = (
  <Provider store={store}>
    <Router history ={history}>
 
      <Route path="/" component={Home}>
    
      </Route>

 
      <Route path="/" component={Global}>

        <Route path="Explore" component={Explore}></Route>
        <Route path="Adventures" component={Adventures}></Route>
        <Route path="Join" component={Join}></Route>
        <Route path="*" component={NotFound}></Route>

      </Route>

    </Router>
  </Provider>
)


render( app , document.getElementById('root'));