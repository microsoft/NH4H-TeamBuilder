import React from 'react';
import nh4h from '../apis/nh4h';

class TeamListItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      members:10
    }
  }

  componentDidMount(){
    nh4h.get('/solutions/hackers/'+this.props.id)
    .then((response)=>{
      
      this.setState({members: response.data.userID.length});
    })
  }


  render() {
    return(
      <div class="teal card">
        <div className="content">
          <div className="header">{this.props.name}</div>
        </div>
        <div className="content">
          {this.props.description}
          <br/><br/>
          <strong>We are looking for people with the following skills: {this.props.skills}</strong>
          <br/><br/>
          <div></div>
          
        </div>
        <div class="extra content">
          <span className="right floated">
            <i className="users icon nowrap"></i>
            {this.state.members} Hacker(s)
          </span>
          <span>
          {!this.props.isTeamMember?
          <div class="ui basic green button" onClick={()=>{this.props.Callback('join',this.props.id)}}>Join</div>
          :
          <div class="ui basic red button" onClick={()=>{this.props.Callback('leave',this.props.id)}}>Leave</div>
          }
          </span>
        </div>
      </div>
    )
  }
}

export default TeamListItem;