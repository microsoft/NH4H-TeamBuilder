import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <NavLink to="/"><a className="active item">Home</a></NavLink>
        <NavLink to="/teams"><a className="item">Teams</a></NavLink>
        <div className="right menu">
        <NavLink to="/logout"><a className="ui item">Logout</a></NavLink>
        </div>
      </div>
      <div className="ui segment">
      <Route exact path="/"><div>Home Page</div></Route>
      <Route exact path="/teams"><App/></Route>
      <Route exact path="/logout"><div>Log me out!</div></Route>
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
