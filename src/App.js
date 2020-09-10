import React from 'react';
import logo from './logo.svg';
import './App.css';
import TeamsList from './components/teamslist';

function App() {
let teamslist=[
  {"teamId":101,"teamName":"Sample team1","teamDescription":"Awesome team-1","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":102,"teamName":"Sample team2","teamDescription":"Meh team-2","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":103,"teamName":"Sample team3","teamDescription":"Amazing team-3","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":104,"teamName":"Sample team4","teamDescription":"So-so team-4","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},
  {"teamId":105,"teamName":"Sample team5","teamDescription":"Rockstars team-5","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]}
]

  return (
    <div className="ui fluid container">
      <header className="App-header">
        <TeamsList teams={teamslist}/>
      </header>
    </div>
  );
}

export default App;
