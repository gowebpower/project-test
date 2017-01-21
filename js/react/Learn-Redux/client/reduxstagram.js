import React from 'react';
import { render } from 'react-dom';

// Import CSS
import css from './styles/style.styl';

// Import Components
import App from './components/App';
import Single from './components/Single';
import About from './components/About';
import PhotoGrid from './components/PhotoGrid';

// Import react Router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'; // binding redux to react
import store, { history } from './store';


const app = (
  <Provider store={store}>
    <Router history ={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid}></IndexRoute>

        <Route path="view/:postId" component={Single}></Route>

        <Route path="about" component={About}></Route>

      </Route>
    </Router>
  </Provider>
)


render( app , document.getElementById('root'));