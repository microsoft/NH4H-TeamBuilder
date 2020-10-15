import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import nh4h from '../apis/nh4h';
import UserListItem from './userlistitem';
import * as Msal from "msal";
import { Message } from 'semantic-ui-react'

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
      userid: null,
      userObject:{mySkills:null},
      users: [],
      visible: true,
      allSkillsOption: [],
      unAssignedUsers: []
    }
  }

  inviteToJoin(id){
    console.log("invite user: " + id)
  }

  
  unique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  componentDidMount() {

    let request_url = "/users/solutions/nousers"

    nh4h.get(request_url)
    .then((response) =>{
      let result = response.data.map(t => t.mySkills);
      let filtered = result.filter(function (el) {
        return el != null;
      });
      let allSkills=filtered.join().split(',').map(s => s.trim());
      allSkills = allSkills.filter((value, index, self) => {
        return self.indexOf(value) === index
      });
      let allSkillsOption=allSkills.map(s=>({key:s,text:s,value:s}));
      this.setState({
        users: response.data.filter(u => !(u.mySkills === null)),
        allSkillsOption: allSkillsOption
      });
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
        if(!response.returnError){
        this.setState({ 
          userObject:response.data,
          userid: response.data.userId,
          mySkills: response.data.mySkills
         });
        }
      });
  }


  getUserListItems=(users)=>{
    let res = this.state.users;
    if(this.state.filterText){
      let search = this.state.filterText.toLowerCase();
      res = this.state.users.filter(t => t.mySkills?t.mySkills.toLowerCase().includes(search):false);
    }

    return res.map( ({userId, userDisplayName, mySkills, userMSTeamsEmail}) => ( 
      <UserListItem 
        Callback={this.inviteToJoin} 
        key={userId}
        id={userId} 
        userDisplayName={userDisplayName ? userDisplayName : userMSTeamsEmail}
        mySkills={mySkills}
        userMSTeamsEmail={userMSTeamsEmail}
        />
    ))
  }

  filter=(event, data)=>{
    let search = data.value;
    this.setState({filterText: search});
  }
  
  updateMySkills=()=>{
    this.setState({submitting:true});
    let body={
      'Active':this.state.userObject.active,
      'UserRegEmail':this.state.userObject.userRegEmail,
      'UserDisplayName':this.state.userObject.UserDisplayName,
      'UserRole':this.state.userObject.userRole,
      'UserMSTeamsEmail':this.state.userObject.userMSTeamsEmail,
      'mySkills':this.state.mySkills.trim()
    };
    
    console.log(body);
    nh4h.put('/users/'+this.state.userid, body)
      .then((res)=>{
        let tmpUserObject = this.state.userObject;
        tmpUserObject.mySkills = this.state.mySkills;
        this.setState({submitting:false, userObject:tmpUserObject});
      });
  }

  handleChange=(e)=> {
    this.setState({ mySkills: e.target.value });
  };

 
  handleDismiss = () => {
    this.setState({ visible: false })
  }
 
  render() { 
    
    let showNotification = !this.state.userObject.mySkills && this.state.visible?true:false;

    const divStyle = {
      width: '80%'
    };

    return(
      <div>
        {!this.state.userid?<Message header='Contact Support!'
                content='User Not found please ask for help in general channel.'
              />:""}
        {
        <div className="ui segment">
          <h2>My Skills</h2>
          {showNotification?          
              <Message
                onDismiss={this.handleDismiss}
                header='Update Your Skills!'
                content='Please update your skills so others can find you.'
              />:""}
              
          <label>Comma seperated list of your skills (ex: Nursing, C#, ICU, Mobile)</label>
          <br/>
          <div className="inline field">
            <div className="ui input" style={divStyle}>
            <input placeholder={this.state.userObject.mySkills?this.state.userObject.mySkills:"Add skills"} onChange={ this.handleChange } type="text" value={this.state.mySkills}/>          
            {this.state.submitting?"":<button className="ui primary button" onClick={this.updateMySkills}>{this.state.userObject.mySkills?"Update":"Save"}</button>}
            </div>
          </div>
        </div>
        }
        <div className="ui segment">
          <h2>All Available Hackers</h2>
          Show hackers with specific skill:&nbsp; 
          <div className="ui input">
          <Dropdown clearable onChange={this.filter} placeholder='Skills'  search selection options={this.state.allSkillsOption} />
          </div>
          <div>&nbsp;</div>
          {this.state.users.length == 0 ? 
            <div className="ui">
              <div className="ui active inverted dimmer">
                <div className="ui large text loader">Loading...</div>
              </div>
            </div>
             :""}
          <div className="ui cards">
          { this.getUserListItems(this.state.users)}
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
