import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import nh4h from '../apis/nh4h';
import UserListItem from './userlistitem';

class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
    .then((response) =>
      this.setState({
        users: response.data
      })
    ).then(()=> {
      console.log(this.state.users);
    })
  }


  getUserListItems=(users)=>{
    return users.map( ({userId, userName, userSkills}) => ( 
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
