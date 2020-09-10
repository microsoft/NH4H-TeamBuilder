import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
let teamslist=[
  {"teamId":101,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":102,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":103,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":104,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":105,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]}
]

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
