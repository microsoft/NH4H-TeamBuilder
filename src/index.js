import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import LoggedIn from './components/loggedin';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <div className="ui container">
      <div className="ui secondary pointing menu">
      <NavLink className="active item" to="/">Home</NavLink>
        <NavLink className="item" to="/teams">Teams</NavLink>
      </div>
      <div className="ui segment">
      <Route exact path="/"><App/></Route>
      <Route exact path="/teams"><App/></Route>
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
