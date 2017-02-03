import React from 'react';
import { render } from 'react-dom';

// Import CSS
import 'global/main.scss';
import 'pages/home/main.scss';
import 'pages/join/main.scss';
import 'pages/_shared/main.scss';


// Import Components
import Main from './components/layout/l-main';
import Home from './components/pages/p-home';
import Explore from './components/pages/p-explore';
import Adventures from './components/pages/p-adventures';
import Join from './components/pages/p-join';

// Import react Router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // binding redux to react
import store, { history } from './store';


const app = (
  <Provider store={store}>
    <Router history ={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>

        <Route path="Explore" component={Explore}></Route>
        <Route path="Adventures" component={Adventures}></Route>
        <Route path="Join" component={Join}></Route>

      </Route>
    </Router>
  </Provider>
)


render( app , document.getElementById('root'));