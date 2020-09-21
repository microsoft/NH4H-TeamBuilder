import React from 'react';
import { Dropdown } from 'semantic-ui-react'
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
      users: [
        {'userId': 101, 'userName': 'jokarash@devupconf.org', 'userSkills': ['AI/ML', 'Nursing']},
        {'userId': 102, 'userName': 'sadoshi@devupconf.org', 'userSkills': ['Nursing', 'Wordpress']},
        {'userId': 103, 'userName': 'gubandia@devupconf.org', 'userSkills': ['WordPress', 'AI/ML']},
      ],
      allUsersSkills: ['Wordpress', '.NET', 'Nursing', 'AI/ML']
    }
  }

  inviteToJoin(id){
    console.log("invite user: " + id)
  }

  componentDidMount() {

    let request_url = "/solutions/nousers"

    nh4h.get(request_url)
    .then((response) =>{
      this.setState({
        users: response.data
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
        this.setState({ userid: response.data.userId });
      });
  }


  getUserListItems=(users)=>{
    let res=this.state.users;
    if(this.state.filterText){
      let search=this.state.filterText;
      res= this.state.users.filter(t => t.userSkills?t.userSkills.includes(search):false);
    }
    
    
    return res.map( ({userId, userName, userSkills}) => ( 
      <UserListItem 
        Callback={this.inviteToJoin} 
        key={userId}
        id={userId} 
        userName={userName}
        userSkills={userSkills}
        />
    ))
  }

  

  filter=(e,data)=>{
    this.setState({filterText:data.value});
  }
  
  render() {
    let skillsWantedOptions=this.state.allUsersSkills.map(s=>({key:s,text:s,value:s}));
    return(
      <div>
        Show users with selected skills: 
        <Dropdown clearable onChange={this.filter} placeholder='Skills'  search selection options={skillsWantedOptions} />
        <div>&nbsp;</div>
        <div class="ui cards">
        { this.getUserListItems(this.state.users)}
        </div>
      </div>
    );
  }
}

export default UsersList;
