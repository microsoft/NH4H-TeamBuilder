
import React from 'react';
import {NavLink} from 'react-router-dom';

class Team extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.teamId);
  }
  
  render() {
    
    const joinTeamUrl = "/join/" + this.props.match.params.teamId;
    const leaveTeamUrl = "/leave/" + this.props.match.params.teamId;

    return(
      <div className="ui segments">
        <div className="ui segment">
          Team ID: <br/> {this.props.match.params.teamId}
        </div>
        <div className="ui segment">
          Team Name: <br/> {this.props.match.params.teamId}
        </div>
        <div className="ui segment">
          Team Description: <br/> {this.props.match.params.teamId}
        </div>
        <div className="ui segment">
          Team Required Skills: <br/> {this.props.match.params.teamId}
        </div>
        <div className="ui segment">
          <NavLink to={joinTeamUrl}>
            <button className="ui positive button">Join</button>
          </NavLink>
          <NavLink to={leaveTeamUrl}>
            <button className="ui red button">Leave</button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Team;