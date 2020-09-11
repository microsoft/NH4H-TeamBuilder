import React, { Component } from 'react';
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
    console.log("hi");
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
       
        console.log("User id is:");
        console.log(data.userId);
      })
  }

  componentDidMount() {  
    if(this.state.msalInstance){
      console.log("At least found it");
    }
    if(this.state.msalInstance.getAccount()){ 
      console.log("HIHIHI");
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
      <div>
        <br/>
        User: {this.state.email};
      <TeamsList teams={this.state.teams}/>
      </div>
    );
  }
}

export default App;