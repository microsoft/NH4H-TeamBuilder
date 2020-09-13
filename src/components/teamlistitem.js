import React from 'react';

class TeamListItem extends React.Component {
  
  render() {
    return(
      <div className="item">
        <div className="right floated content header">
          (Members: {this.props.members})
        </div>
        <div className="content">
          <div className="header">{this.props.name}</div>
          <br/>
          <div>
            {this.props.description}
            <br/><br/>
            <strong>We are looking for people with the following skills: {this.props.skills}</strong>
            <br/><br/>
            <button onClick={()=>{this.props.Callback('join',this.props.id)}} className="ui positive button">Join</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TeamListItem;