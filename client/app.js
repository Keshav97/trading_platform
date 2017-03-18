import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Importing components
import Main from './components/Main';
import Platform from './components/Platform';

import css from './css/style.css';


const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Platform} />
    </Route>
  </Router>
)

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

render(router, document.getElementById('root'));
