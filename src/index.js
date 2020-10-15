import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter, Switch} from 'react-router-dom';
import App from './App';
import UsersList from './components/userslist';
import Menu from './components/menu';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <div className="ui container">
     
      
      <Switch>
        <Route path="/users">
          <Menu/>
          <div className="ui segment">
          <UsersList/>
          </div>
        </Route>
        <Route path="/">
          <Menu team="a"/>
          <div className="ui segment">
          <App/>
          </div>
        </Route>
        </Switch>
    </div>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
