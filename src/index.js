import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import App from './App';
import Team from './components/team';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  <HashRouter>
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <NavLink to="/" className="active item">Home</NavLink>
        <NavLink to="/teams" className="item">Teams</NavLink>
        <div className="right menu">
        <NavLink to="/logout" className="ui item">Logout</NavLink>
        </div>
      </div>
      <div className="ui segment">
        <Route exact path="/"><div>Home Page</div></Route>
        <Route path="/teams"><App/></Route>
        <Route path="/logout"><div>Log me out!</div></Route>
        <Route path="/team/:teamId" component={Team}/>
        <Route path="/join/:teamId/:userId"><div>Join a team</div></Route>
        <Route path="/leave/:teamId/:userId"><div>Leave a team</div></Route>
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
