import React, { Component } from 'react';
import * as Msal from "msal";
import TeamsList from './components/teamslist';
import nh4h from './apis/nh4h';
import TeamForm from './components/createteam';
import TeamListItem from './components/teamlistitem';
import GitHubUserEntry from './components/gituserentry-modal-hook';
import { Message } from 'semantic-ui-react'
import User from './apis/user';
import Team from './apis/team';

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
      user: new User(),
      team: new Team(),
      username: "",
      email: "",
      githubid: null,
      enableTeamBuilder:false,
      userid: null,
      loggedin: false,
      teams: [],
      t:null,
      myteam:-1,
      showcreate:false,
      skillsWantedOptions:[],
      allteams:[]
    };
  }

  componentDidMount() {
    if (this.state.msalInstance.getAccount()) {
      let id = this.state.msalInstance.getAccount();
      let nUser=this.state.user;
      nUser.email=id.userName;
      this.setState({
        loggedin: true,
        user: nUser,
        email: id.userName,
        username: id.name
      }, () => {
        this.getUserInfo();
      });     

    } else {
      let loginRequest = {
        scopes: ["user.read"] // optional Array<string>
      };
      this.state.msalInstance.loginRedirect(loginRequest);
    }
  }

  getUserInfo = () => {
    this.state.user.getUserID()
    .then(()=>{
      if(this.state.user.githubuser){   
        this.getTeams();
        this.setState({enableTeamBuilder:true});
        this.state.user.getTeam()
        .then(()=>{
            console.log(this.state.user);
            let t=this.state.team.allteams.find(obj => obj.teamId === this.state.user.myteam );
            this.setState({
              user:this.state.user,
              t:t});
          this.setState({user:this.state.user});
        });
      }
    });  
      
       
        
  }
  
  getTeams = () => {
    this.state.team.getAllTeams()
   .then(()=>{
     this.setState({team:this.state.team});
     
    });
    
  }
  
  CreateNewTeam=(body)=>{
    body.createdBy=this.state.user.email; 
    this.state.team.createNewTeam(body)
      .then(()=>{
        this.changeTeamMembership(true,this.state.team.teamid,1);
        this.toggleShowCreate();
        this.getTeams();  
      });      
   } 

   editTeam=(body)=>{
    body.modifiedBy=this.state.user.email; 
    this.state.team.editTeam(this.state.user.myteam,body)
    .then(()=>{
      this.editMyTeam();
      this.getTeams();  
    });
   }

  changeTeamMembership=(join, id,islead=0) =>{
    this.state.user.changeTeamMembership(join,id,islead)
    .then(()=>{
      //refresh teams list
      //this.setState({myteam:-1,t:null},()=>{this.getUserID();});
      this.getTeams();
      this.getUserInfo();
    });
  }

toggleShowCreate =()=>{
  this.setState({showCreate:!this.state.showCreate});
}

editMyTeam=()=>{  
  this.setState({showCreate:!this.state.showCreate});  
}


filteroutMyTeam=()=>{
  let res=this.state.team.allteams.filter(t => t.teamId!==this.state.user.myteam);
  if (res.length!==this.state.team.allteams.length)
  { 
    this.setState({teams:res});
  }
}

saveGitUser=(body)=>{
  body.UserId=this.state.user.userid;
  nh4h.put("/users/github/" + this.state.user.userid, body )
  .then((resp) => {
    this.setState({enableTeamBuilder:true});
  });

}

render() {
 
  
  let buttonText=!this.state.showCreate?'Create a Team!':'Never Mind';
  
    return (
      <div className="ui">
        {!this.state.user.userid?
          <Message header='Contact Support!' content='User Not found please ask for help in general channel.'/>
        :
          this.state.enableTeamBuilder ?
            <div id="TeamBuilder">
              {this.state.t?
                <div hidden={this.state.showCreate}>
                  <h2>Your Team </h2>
                  <div className="ui special fluid">
                    <TeamListItem Callback={this.changeTeamMembership} edit={this.editMyTeam}
                    id={this.state.t.teamId} name={this.state.t.teamName} description={this.state.t.teamDescription} challengeName={this.state.t.challengeName} isTeamMember={this.state.t.teamId===this.state.user.myteam} skills={this.state.t.skillsWanted} dit={this.editMyTeam} teamslink={this.state.t.msTeamsChannel}/>
                  </div>
                </div>
              :
                <button onClick={this.toggleShowCreate} className="ui positive button">{buttonText}</button>
              }
              <TeamForm visible={this.state.showCreate} team={this.state.t} createTeam={this.CreateNewTeam} editTeam={this.editTeam} />
              <br/><h2>All Teams</h2>
              <TeamsList edit={this.editMyTeam} Callback={this.changeTeamMembership} myteam={this.state.user.myteam} teams={this.state.team.allteams} />
            </div>
          :
            <GitHubUserEntry saveGH={this.saveGitUser} userid={this.state.user.userid} />
          }  
      </div>
    );  
  }
}

export default App;