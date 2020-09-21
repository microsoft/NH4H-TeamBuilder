import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import TeamListItem from './teamlistitem';

class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      allUsersSkills: [],
      userSkills: []
    }
  }

  inviteToJoin(id){
    console.log("invite user: " + id)
  }

  getUserListItems=(teamlist)=>{
    return teamlist.map( ({userId, userName, userSkills}) => ( 
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
    let search=data.value;
    let res=this.state.users.filter(t => t.userSkills?t.userSkills.includes(search):false);
    this.setState({users:res});
  }
  
  render() {
    return(
      <div>
      Filter By Teams Seeking: 
      <Dropdown clearable onChange={this.filter} placeholder='Skills'  search selection options={this.state.allUsersSkills} />
      { getUserListItems }
      </div>
    );
  }
}

export default UsersList;
