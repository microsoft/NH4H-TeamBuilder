import React, { Component } from 'react';
import * as Msal from "msal";
import TeamsList from './components/teamslist';
import nh4h from './apis/nh4h';
import TeamForm from './components/createteam';
import TeamListItem from './components/teamlistitem';
import GitHubUserEntry from './components/gituserentry-modal-hook';
import { Dropdown } from 'semantic-ui-react'
import { Message } from 'semantic-ui-react'

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
    this.changeTeamMembership = this.changeTeamMembership.bind(this);
    this.NewTeamCreated = this.NewTeamCreated.bind(this);
    this.editMyTeam=this.editMyTeam.bind(this);
  }

  getMyTeam=()=>{    
        
  }

  getUserInfo = () => {
    let body = { UserMSTeamsEmail: this.state.email };
    nh4h.post('/users/msemail', body)
      .then((response) => {
        if(!response.returnError){
          this.setState({ userid: response.data.userId });
        }
        nh4h.get('/users/solutions/'+response.data.userId)
        .then((resp)=>{
          if(resp.data.teamId.length>0) {
            let myteam=resp.data.teamId[0];
            let t=this.state.teams.find(obj => obj.teamId === myteam );
            this.setState({myteam:myteam,t:t});
          }          
        });
        nh4h.get('/users/githubid/' + this.state.userid).then((resp) => {
          if(resp.data.gitHubId != null) {
            this.setState({ githubid: response.data.gitHubId });
            this.setState((state) => {
              if(state != null) {
                this.getTeams();
              }
            });
            this.setState({ enableTeamBuilder: true });
         
          }

        });
      });
  }

  getTeams = () => {
    nh4h.get('/solutions/')
      .then((response) => {
        
        let result = response.data.map(t => t.skillsWanted);
        var filtered = result.filter(function (el) {
          return el != null;
        });
        let skillsWanted=filtered.join().split(',').map(s => s.trim());
        let skillsWantedOptions=skillsWanted.map(s=>({key:s,text:s,value:s}));
        this.setState({ allteams:response.data, teams: response.data, skillsWantedOptions: skillsWantedOptions});
        
        
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
        this.getUserInfo();
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
      this.setState({myteam:-1, teams:this.state.allteams, t:null}); 

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
      //this.setState({myteam:-1,t:null},()=>{this.getUserID();});
      this.getTeams();
      this.getUserInfo();

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
  this.setState({showCreate:!this.state.showCreate});  
}

getMyTeam=()=>{
  let t=this.state.t;
  if(this.state.showCreate){
    return "";
  }
  return t?(
    <div>
      <h2>Your Team </h2>
      <div className="ui special fluid">
        <TeamListItem Callback={this.changeTeamMembership} 
        id={t.teamId} 
        name={t.teamName} description={t.teamDescription}
        challengeName={t.challengeName}
        isTeamMember={t.teamId===this.state.myteam}
        skills={t.skillsWanted}
        edit={this.editMyTeam}
        teamslink={t.msTeamsChannel}
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
filter=(e,data)=>{
  let search=data.value;
  let res=this.state.allteams.filter(t => t.skillsWanted?t.skillsWanted.includes(search):false);
  this.setState({teams:res});
}

filteroutMyTeam=()=>{
  let res=this.state.teams.filter(t => t.teamId!==this.state.myteam);
  if (res.length!==this.state.teams.length)
  { 
    this.setState({teams:res});
  }
}

render() {
  //console.log(this.state.teams);
  //console.log(this.state.myteam);
  if(this.state.myteam>0){
    this.filteroutMyTeam();
  }

  if(this.state.enableTeamBuilder) {
    return (
      <div className="ui">
        {!this.state.userid?<Message header='Contact Support!'
                  content='User Not found please ask for help in general channel.'
                />:""}
        {this.state.t?this.getMyTeam():this.getCreateButton()}
        {this.state.showCreate?<TeamForm team={this.state.t} JoinTeam={this.changeTeamMembership} Callback={this.NewTeamCreated}/>:<div/>}
        <br/>
        <span>
          Filter By Teams Seeking: 
        <Dropdown clearable onChange={this.filter} placeholder='Skills'  search selection options={this.state.skillsWantedOptions} />
        </span>
        <h2>All Teams</h2>
        <TeamsList Callback={this.changeTeamMembership} myteam={this.state.myteam} teams={this.state.teams} />
      </div>
    );
  } else {
    return (
      <div className="ui">
        <GitHubUserEntry userid={this.state.userid} />
        
        {!this.state.userid?<Message header='Contact Support!'
                  content='User Not found please ask for help in general channel.'
                />:""}
        {this.state.t?this.getMyTeam():this.getCreateButton()}
        {this.state.showCreate?<TeamForm team={this.state.t} JoinTeam={this.changeTeamMembership} Callback={this.NewTeamCreated}/>:<div/>}
        <br/>
        <span>
          Filter By Teams Seeking: 
        <Dropdown clearable onChange={this.filter} placeholder='Skills'  search selection options={this.state.skillsWantedOptions} />
        </span>
        <h2>All Teams</h2>
        <TeamsList Callback={this.changeTeamMembership} myteam={this.state.myteam} teams={this.state.teams} />
        
      </div>
    );
  }
}
}

export default App;