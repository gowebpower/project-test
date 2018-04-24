// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { render } from 'react-dom';


// ---------------------- Components

import Home from './views/home/index.jsx';

// ---------------------- CSS

// Global
import 'global/main.scss';

// For Page Components
import 'pages/_components/main.scss'; 


// ******************************************************************
// ----------------------- Export
// ******************************************************************

const App = (
   
  <Home />
 
)

render( App , document.getElementById('App'));
