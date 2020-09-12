import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
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
      db_userid:"",
      loggedin:false,
      teams:[]
    };
   
  }

  getUserID(){
    var endpoint = "https://nursehackapi20200906232054.azurewebsites.net/api/users/msemail";
    var options = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ UserMSTeamsEmail : this.state.email })
    };
    fetch(endpoint, options)
      .then(response => response.json())
      .then(data => {
       this.setState({userid:data});
        
      })
  }

  componentDidMount() {  
    
    if(this.state.msalInstance.getAccount()){ 
      
    let id=this.state.msalInstance.getAccount();
      this.setState({
      loggedin:true,
      email:id.userName,
      username:id.name}, () => {
        this.getUserID();
    });
      
    }else{
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
      <div className="ui">
        <div className="ui segment">
          User: {this.state.email};
        </div>
        <TeamsList teams={this.state.teams}/>
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