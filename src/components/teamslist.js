import React from 'react';
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: []
    }
    this.joinOrLeaveTeam=this.joinOrLeaveTeam.bind(this);
  }

  joinOrLeaveTeam(type,id){
    this.props.Callback(type,id);
  }
  
  getTeamListItems=()=>{
  return this.props.teams.map( ({teamId, teamName, teamDescription,tblTeamHackers}) => ( 
    <TeamListItem Callback={this.joinOrLeaveTeam} 
      key={teamId} id={teamId} 
      name={teamName} description={teamDescription}
      members={tblTeamHackers.length}
      />
  ))
  }
  render() {

    return(
      <div>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Challenge Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.getTeamListItems()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeamsList;
