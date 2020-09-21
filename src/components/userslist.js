import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'


class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users:[]
    }
    
  }

   
  
  //{this.getTeamListItems(this.state.teams)}
  render() {
    return(
      <Accordion fluid styled>
       <h1>USERS LIST PLACEHOLDER!</h1>
        {this.state.users}      
      </Accordion>
    );
  }
}

export default UsersList;
