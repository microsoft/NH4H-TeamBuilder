import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import nh4h from '../apis/nh4h';

class TeamForm extends React.Component {
  constructor(props){
    super(props);
    let name='';
    let desc='';
    let skills='';
    let chall='Improve access to reliable, trusted information';
    if(props.team){
      
      let t=props.team;
      
      name=t.teamName;
      desc=t.teamDescription;
      skills=t.skillsWanted;
      chall=t.challengeName;
    }
    this.state = {
      teamName: name,
      teamDescription: desc,
      challengeName: chall,
      challengeNameOptions: [
        {key: 'info-access', text: 'Improve access to reliable, trusted information',value:'Improve access to reliable, trusted information'},
        {key: 'other', text: 'Other', value: 'Other'}
      ],
      skillsWanted:skills,
      teamActive: 1,
      submitting:false,
      created:false
    };
  }

  handleInputChange = (event,d) => {
    
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    if(d){
      name=d.name;
      value=d.value;
    }
    this.setState({
      [name]: value
    });
  }

  newTeam=()=>{
    nh4h.post('/solutions', {
      teamName: this.state.teamName,
      teamDescription: this.state.teamDescription,
      challengeName: this.state.challengeName,
      skillsWanted: this.state.skillsWanted
    }).then((resp)=>{
      
      let teamid=resp.data.teamId;
      this.setState({created:true,submitting:false});
      this.props.JoinTeam('join',teamid);
      this.props.Callback();
    }); 
  }

  editTeam=()=>{
    nh4h.put('/solutions/'+this.props.team.teamId, {
      teamName: this.props.team.teamName,
      teamDescription: this.state.teamDescription,
      challengeName: this.state.challengeName,
      skillsWanted: this.state.skillsWanted
    }).then((resp)=>{
      
      let teamid=resp.data.teamId;
      this.setState({created:true,submitting:false});
      this.props.Callback();
    }); 
  }
  

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({submitting:true},()=>{
   if(!this.props.team){
     this.newTeam();
   }else{
     this.editTeam();
   }
    
  });

  }

  render() {
    let valid=(
      this.state.challengeName!=''
      && this.state.teamName.trim()!=''
      && this.state.teamDescription.trim()!=''      
      );
      
      
    return(
      <div className="ui segment">
        {!this.state.created?
        <form onSubmit={this.handleSubmit} className="ui form">
          {this.props.team?"":
          <div className="field">
            <label>Team Name</label>
            <input value={this.state.teamName} name="teamName" type="text" onChange={this.handleInputChange}/>
          </div>
          }
          <div className="field">
            <label>Team description</label>
            <textarea value={this.state.teamDescription} name="teamDescription" rows="2" onChange={this.handleInputChange}></textarea>
          </div>
          <div className="field">
            <label>We are looking for people with these skills</label>
            <input value={this.state.skillsWanted}name="skillsWanted" type="text" onChange={this.handleInputChange}/>
          </div>
          {this.props.team?"":
          <div className="field">
            
          </div>
          }
          <div className="ui basic segment">
            {this.state.submitting?
            <span className="ui">Creating...</span>
            :
            (valid?
              <button className="ui primary button" type="submit">{this.props.team?'Save':'Create Team'}</button>
              :<span className="ui message message-warning">All of the above are required</span>)
            }
          </div>
        </form>
        :
        <span className="ui">Team Created</span>
        }
       </div>
    )
  }
}

export default TeamForm;