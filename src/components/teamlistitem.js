import React from 'react';
import nh4h from '../apis/nh4h';
//links to general of prod channel
const DEF_TEAMSLINK='https://teams.microsoft.com/l/channel/19%3a6c83ba5af8664dc3b1a0d8a8a0774094%40thread.tacv2/General?groupId=abc0763c-f446-424c-ba5f-e374147c11a0&tenantId=e773e193-89d3-44d9-ae4e-17766699f674';
class TeamListItem extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      members:1
    }
  }

  componentDidMount(){
    nh4h.get('/solutions/hackers/'+this.props.id)
    .then((response)=>{
      
      this.setState({members: response.data.userID.length});
    })
  }
  getTeamsLink=()=>{
    return this.props.teamslink?this.props.teamslink:DEF_TEAMSLINK;
  }


  render() {
    return(
      <div className="teal card">
        <div className="content">
        {!this.props.isTeamMember?
          <div className="header">{this.props.name}</div>
          :
          <div className="header"><h3>{this.props.name}</h3></div>
        }
        </div>        
        <div className="content">
          {this.props.description}
          <br/><br/>
          <strong>We are looking for people with the following skills: {this.props.skills}</strong>
          <br/><br/>
          <div></div>
          
        </div>
        <div className="extra content">
        <span className="right floated">
            <a href={this.getTeamsLink()}>
              <i className="chat icon nowrap"></i>
              Chat with {this.state.members} Hacker{this.state.members==1?'':'s'} </a>
            
          </span>
          {this.props.isTeamMember?<br/>:''}
         
          <span>
          {!this.props.isTeamMember?
          <div className="ui basic green button" onClick={()=>{this.props.Callback('join',this.props.id)}}>Join</div>
          :
          <div>
          <div className="ui basic red button" onClick={()=>{this.props.Callback('leave',this.props.id)}}>Leave</div>
          <div className="ui basic blue button" onClick={()=>{this.props.edit()}}>Edit</div>
          </div>
          }
          </span>
        </div>
      </div>
    )
  }
}

export default TeamListItem;