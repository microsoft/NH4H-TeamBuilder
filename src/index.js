import React from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import App from './App';
<<<<<<< HEAD
import LoggedIn from './components/loggedin';
=======
import Team from './components/team';
>>>>>>> e072ba2f7e330a423c786cbc11d4bd83e14ee7ff
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
