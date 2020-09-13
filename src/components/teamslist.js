import React from 'react';
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: [],
      challenges:[]
    }
    this.joinOrLeaveTeam=this.joinOrLeaveTeam.bind(this);
  }

  componentDidUpdate() {
    this.state.teams=this.groupBy(this.props.teams,'challengeName');
    this.state.challenges = Object.getOwnPropertyNames(this.state.teams);
  }

  joinOrLeaveTeam(type,id){
    this.props.Callback(type,id);
  }

  groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}
  // {this.getTeamListItems(this.state.teams[c])}
  getChallengesList=()=>{
    return this.state.challenges.map((c)=>(
      <div>
      <br/>
      <span className="ui message">Challenge: {c}</span>
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
        {this.getTeamListItems(this.state.teams[c])}
        </tbody>
        </table>
       <br/>
      </div>
    ));
  }
  getTeamListItems=(teamlist)=>{
  return teamlist.map( ({teamId, teamName, teamDescription,tblTeamHackers,challengeName}) => ( 
    <TeamListItem Callback={this.joinOrLeaveTeam} 
      key={teamId} id={teamId} 
      name={teamName} description={teamDescription}
      members={tblTeamHackers.length}
      challengeName={challengeName}
      
      />
  ))
  }
  //{this.getTeamListItems(this.state.teams)}
  render() {

    return(
      <div>
        {this.getChallengesList()}
      </div>
    );
  }
}

export default TeamsList;
