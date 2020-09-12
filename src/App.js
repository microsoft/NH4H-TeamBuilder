import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as Msal from "msal";
import TeamsList from './components/teamslist';
import nh4h from './apis/nh4h';

class App extends Component {
  constructor(props) {
    super(props);
    let msalConfig = {
      auth: {
        clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',
        authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
        //    redirectUri:"/loggedin" 
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance: msalI,
      username: "",
      email: "",
      db_userid: "",
      loggedin: false,
      teams: []
    };
    this.changeTeamMembership = this.changeTeamMembership.bind(this);

  }


  getUserID = () => {
    let body = { UserMSTeamsEmail: this.state.email };
    nh4h.post('/users/msemail', body)
      .then((response) => {
        this.setState({ userid: response.data.userId });
      });
  }
  getTeams = () => {
    nh4h.get('/solutions/')
      .then((response) => {
        this.setState({ teams: response.data });
      });
  }

  componentDidMount() {

    if (this.state.msalInstance.getAccount()) {

      let id = this.state.msalInstance.getAccount();
      this.setState({
        loggedin: true,
        email: id.userName,
        username: id.name
      }, () => {
        this.getUserID();
        this.getTeams();
      });

    } else {
      let loginRequest = {
        scopes: ["user.read"] // optional Array<string>
      };
      this.state.msalInstance.loginRedirect(loginRequest)
        .then(response => {

        })
        .catch(err => {
          // handle error
        });
    }
  }
  
  changeTeamMembership(join, id) {
    console.log(id);
    console.log(join);
    let team = this.state.teams.find(x => x.teamId === id);
    let teamMembers = team.tblTeamHackers;
    let index = this.state.teams.findIndex(x => x.UserId === this.state.userid);

    if (join === 'join' && index < 0) {
      let thisUser = { TeamId: id, UserId: this.state.userid, IsLead: 0 };
      teamMembers.splice(0, 0, thisUser);
    }
    if (join === 'leave' && index >= 0) {
      teamMembers.splice(index, 1);
    }
    let body = {
      teamId: id, teamName: team.teamName,
      teamDescription: team.teamDescription,
      challengeName: team.challengeName,
      active: team.active,
      tblTeamHackers: teamMembers
    };
    console.log(body);
  }


render() {
  return (
    <div className="ui">
      <div className="ui segment">
        User: {this.state.email};
        </div>
      <TeamsList Callback={this.changeTeamMembership} teams={this.state.teams} />
      <div className="ui basic segment">
        <NavLink to="/team/new">
          <button className="ui positive button">Create Team</button>
        </NavLink>
      </div>
    </div>
  );
}
}

export default App;