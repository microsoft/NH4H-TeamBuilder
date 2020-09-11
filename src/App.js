import React, { Component, useDebugValue } from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import * as Msal from "msal";
import TeamsList from './components/teamslist';

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
      msalInstance:msalI,
      username:"",
      email:"",
      loggedin:false,
      teams:[{"teamId":101,"teamName":"Solution100","teamDescription":null,"githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":true,"createdDate":"2020-09-07T17:09:21.1433333","createdBy":null,"modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},{"teamId":102,"teamName":"Solution1","teamDescription":null,"githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":true,"createdDate":"0001-01-01T00:00:00","createdBy":null,"modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},{"teamId":103,"teamName":"Sample team1","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},{"teamId":104,"teamName":"Sample team2","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},{"teamId":105,"teamName":"team3","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]},{"teamId":106,"teamName":"team4","teamDescription":"Sample desc","githubURL":null,"msTeamsChannel":null,"msLabEnvironment":null,"msLabTenantName":null,"msLabAzureUsername":null,"msLabSPNAppId":null,"msLabSPNAppObjectId":null,"msLabSPNObjectId":null,"msLabSPNDisplayName":null,"msLabSPNKey":null,"active":false,"createdDate":"0001-01-01T00:00:00","createdBy":"sadoshi@microsoft.com","modifiedDate":"0001-01-01T00:00:00","modifiedBy":null,"tblTeamSkillMatch":[],"tblTeamHackers":[]}]
    };
   
  }
  getUserID(){
    
  }
  
  componentDidMount() {  
    let loginRequest = {
      scopes: ["user.read"] // optional Array<string>
    };
    if(this.state.msalInstance.getAccount()){ 
    let id=this.state.msalInstance.getAccount();
      this.setState({
      loggedin:true,
      email:id.userName,
      username:id.name});
      //go get userid
    }else{
      this.state.msalInstance.loginRedirect(loginRequest)
       .then(response => {
          
       })
       .catch(err => {
           // handle error
       });
      }

       var endpoint = "https://nursehackapi20200906232054.azurewebsites.net/api/solutions/";
       var options = {
         method: "GET",
       };
       fetch(endpoint, options)
         .then(response => response.json())
         .then(data => {
          this.setState({ teams: data });
 
         })

  }
  
  render() {
    return (
      <div>
        <br/>
        User: {this.state.email};
      <TeamsList teams={this.state.teams}/>
      </div>
    );
  }
}

export default App;