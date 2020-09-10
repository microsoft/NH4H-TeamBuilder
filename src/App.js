import React, { Component, useDebugValue } from 'react';
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
        authority : "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674"
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance:msalI,
      username:"",
      email:"",
      loggedin:false,
      token: ''
    };
   
  }
  componentDidMount() {  
    let loginRequest = {
      scopes: ["user.read"] // optional Array<string>
    };
  
      this.state.msalInstance.loginPopup(loginRequest)
       .then(response => {
          let id= this.state.msalInstance.getAccount(); 
          this.setState({loggedin:true,email:id.userName,username:id.name});
       })
       .catch(err => {
           // handle error
       });

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
    <div className="App">
      {this.state.loggedin ?
      <header className="App-header">
        <TeamsList teams={teams}/>
      </header>
      :""}
    </div>
  );
}
}


export default App;