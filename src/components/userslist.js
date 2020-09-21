import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import nh4h from '../apis/nh4h';
import UserListItem from './userlistitem';
import * as Msal from "msal";

class UsersList extends React.Component {
  constructor(props){
    super(props);
    let msalConfig = {
      auth: {
        clientId: 'b3544b0c-1209-4fe8-b799-8f63a0179fa0',
        authority: "https://login.microsoftonline.com/e773e193-89d3-44d9-ae4e-17766699f674",
        //redirectUri:"/loggedin" 
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance: msalI,
      email: "",
      userid: "",
      userObject:null,
      users: []
    }
  }

  inviteToJoin(id){
    console.log("invite user: " + id)
  }

  

  componentDidMount() {

    let request_url = "/users/solutions/nousers"

    nh4h.get(request_url)
    .then((response) =>{
      this.setState({
        users: response.data
      });
      console.log(response.data);
    }).catch((response)=>{
      console.error("Error fetching unassigned users");
      console.error(response);
    });
    
    //get login info
    if (this.state.msalInstance.getAccount()) {

      let id = this.state.msalInstance.getAccount();
      this.setState({
        email: id.userName,
        username: id.name
      }, () => {
        this.getUserID();
      });

    } 
  }

  getUserID = () => {
    let body = { UserMSTeamsEmail: this.state.email };
    nh4h.post('/users/msemail', body)
      .then((response) => {
        this.setState({ 
          userObject:response.data,
          userid: response.data.userId,
          mySkills: response.data.mySkills
         });
      });
  }


  getUserListItems=(users)=>{
    let res=this.state.users;
    if(this.state.filterText){
      let search=this.state.filterText;
      res= this.state.users.filter(t => t.mySkills?t.mySkills.includes(search):false);
    }
    
   

    return res.map( ({userId, userDisplayName, mySkills, userMSTeamsEmail}) => ( 
      <UserListItem 
        Callback={this.inviteToJoin} 
        key={userId}
        id={userId} 
        userDisplayName={userDisplayName ? userDisplayName : userMSTeamsEmail}
        mySkills={mySkills}
        />
    ))
  }

  

  filter=(event)=>{

    const target = event.target;
    this.setState({filterText: target.value});
  }
  
  updateMySkills=()=>{
    this.setState({submitting:true});
    let body={
      'Active':this.state.userObject.active,
      'UserRegEmail':this.state.userObject.userRegEmail,
      'UserDisplayName':this.state.userObject.UserDisplayName,
      'UserRole':this.state.userObject.userRole,
      'UserMSTeamsEmail':this.state.userObject.userMSTeamsEmail,
      'mySkills':this.state.mySkills
    };
    
    console.log(body);
    nh4h.put('/users/'+this.state.userid, body)
      .then((res)=>{
        this.setState({submitting:false});
      });
  }

  handleChange=(e)=> {
    this.setState({ mySkills: e.target.value });
  };
  
  render() {
    return(
      <div>
        <h2>My Skills</h2>
        <label>Comma seperaged list of your skills (ex: Nursing, C#, ICU, Mobile)</label>
        <br/>
        <div className="inline field">
          <div className="ui input">
          <input placeholder={this.state.mySkills} onChange={ this.handleChange } type="text" value={this.state.myskills}/>          
          {this.state.submitting?"":<button className="ui primary button" onClick={this.updateMySkills}>Update</button>}
          </div>
        </div>
        <h2>All Unassigned Users</h2>
        Show users with selected skills: 
        <div className="ui input"><input type="text" onChange={this.filter} placeholder="Search..."/></div>
        <div>&nbsp;</div>
        <div class="ui cards">
        { this.getUserListItems(this.state.users)}
        </div>
      </div>
    );
  }
}

export default UsersList;
