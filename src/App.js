import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as Msal from "msal";
import TeamsList from './components/teamslist';
import nh4h from './apis/nh4h';
import TeamForm from './components/createteam';
import TeamListItem from './components/teamlistitem';

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
      userid: "",
      loggedin: false,
      teams: [],
      t:null,
      myteam:-1,
      showcreate:false
    };
    this.changeTeamMembership = this.changeTeamMembership.bind(this);
    this.NewTeamCreated = this.NewTeamCreated.bind(this);
    this.editMyTeam=this.editMyTeam.bind(this);
  }

  getMyTeam=()=>{
    
  }

  getUserID = () => {
    let body = { UserMSTeamsEmail: this.state.email };
    nh4h.post('/users/msemail', body)
      .then((response) => {
        this.setState({ userid: response.data.userId });
        nh4h.get('/users/solutions/'+response.data.userId)
        .then((resp)=>{
          if(resp.data.teamId.length>0){
            let myteam=resp.data.teamId[0];
            let t=this.state.teams.find(obj => obj.teamId == myteam );
            this.setState({myteam:myteam,t:t});
          }
        });
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
    
    
    
    
    
    let teamMembers = [];
    
    
    if (join === 'join') {
      let thisUser = { TeamId: id, UserId: this.state.userid, IsLead: 0 };
      teamMembers.splice(0, 0, thisUser);
    }
    if (join === 'leave') {
      //teamMembers.splice(index, 1);
    }
    
    let body = {
      UserId: this.state.userid,
      tblTeamHackers:teamMembers
    };
    
    //fire put request
    let url='/users/solutions/' + this.state.userid
    nh4h.put(url, body)
    .then(()=>{
      //refresh teams list
      this.setState({myteam:-1},()=>{this.getUserID();});
      

    });
    
  }

  toggleShowCreate =()=>{
    this.setState({showCreate:!this.state.showCreate});
  }
NewTeamCreated(){
  this.toggleShowCreate();
  this.getTeams();
  
}

editMyTeam(){
  console.log("edit team");
  this.setState({showCreate:true});
  
}
getMyTeam=()=>{
  let t=this.state.t;
  
  return t?(
    <div>
      <h2>Your Team </h2>
      <div className="ui special stackable cards">
        <TeamListItem Callback={this.changeTeamMembership} 
        id={t.teamId} 
        name={t.teamName} description={t.teamDescription}
        challengeName={t.challengeName}
        isTeamMember={t.teamId==this.state.myteam}
        skills={t.skillsWanted}
        edit={this.editMyTeam}
        />
      </div>
    </div>
    
  ):"";
}

getCreateButton=()=>{
  let buttonText=!this.state.showCreate?'Create a Team!':'Never Mind';
  return(<button onClick={()=>{this.toggleShowCreate()}}
  className="ui positive button">
    {buttonText}</button>
    );
}

render() {
  return (
    <div className="ui">
      {(this.state.myteam>0)?this.getMyTeam():this.getCreateButton()}
      {this.state.showCreate?<TeamForm team={this.state.t} JoinTeam={this.changeTeamMembership} Callback={this.NewTeamCreated}/>:<div/>}
      <br/>
      <h2>All Teams</h2>
      <TeamsList Callback={this.changeTeamMembership} myteam={this.state.myteam} teams={this.state.teams} />
    </div>
  );
}
}

export default App;