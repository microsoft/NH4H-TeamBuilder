import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import TeamListItem from './teamlistitem';

class TeamsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: [],
      challenges:[],
      activeIndex: 0
    }
    this.joinOrLeaveTeam=this.joinOrLeaveTeam.bind(this);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
    return this.state.challenges.map((c, index)=>(
      <div>
      <Accordion.Title
        active={this.state.activeIndex === index}
        index={index}
        onClick={this.handleClick}
        >
        <Icon name='dropdown' />
       {c}
      </Accordion.Title>
      <Accordion.Content active={this.state.activeIndex === index}>
        <div className="ui middle aligned divided list">
          {this.getTeamListItems(this.state.teams[c])}
        </div>
      </Accordion.Content>
      </div>
    ));
  }
  getTeamListItems=(teamlist)=>{
  return teamlist.map( ({teamId, teamName, teamDescription,tblTeamHackers,challengeName}) => ( 
    <TeamListItem 
      Callback={this.joinOrLeaveTeam} 
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
      <Accordion fluid styled>
      {this.getChallengesList()}      
      </Accordion>
    );
  }
}

export default TeamsList;
