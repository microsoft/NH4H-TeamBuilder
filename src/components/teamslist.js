import React from 'react';
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    console.log(this.props.teams);

    return(
      <div>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.teams.map( ({teamId, teamName, teamDescription}) => (
            <TeamListItem key={teamId} teamId={teamId} name={teamName} description={teamDescription}/>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeamsList;
