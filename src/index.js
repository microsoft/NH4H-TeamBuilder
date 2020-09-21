import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter, Switch} from 'react-router-dom';
import App from './App';
import UsersList from './components/userslist';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <NavLink to="/"><a className="active item">Teams</a></NavLink>
        <NavLink to="/users"><a className="item">Users</a></NavLink>
        
      </div>
      <div className="ui segment">
      <Switch>
        <Route path="/users"><UsersList/></Route>
        <Route path="/"><App/></Route>
        </Switch>
      </div>
    </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
