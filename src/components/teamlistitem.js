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
      <div className="item">
        <div className="right floated content header">
          
          (Members: {this.state.members}  )
        </div>
        <div className="content">
          <div className="header">{this.props.name}</div>
          <br/>
          <div>
            {this.props.description}
            <br/><br/>
            <strong>We are looking for people with the following skills: {this.props.skills}</strong>
            <br/><br/>
            {!this.props.isTeamMember?
            <button onClick={()=>{this.props.Callback('join',this.props.id)}} className="ui positive button">Join</button>
            :
            <button onClick={()=>{this.props.Callback('leave',this.props.id)}} className="ui red button">Leave</button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TeamListItem;