import React from 'react';
import { Dropdown } from 'semantic-ui-react'
import nh4h from '../apis/nh4h';

class TeamForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teamName: '',
      teamDescription: '',
      challengeNameOptions: [
        {key: 'mark-wearing', text: 'Encourage mark wearing', value: 'Encourage mark wearing'},
        {key: 'nursing-easier', text: 'Make nursing easier', value: 'Make nursing easier'},
        {key: 'at-home-diagnosis', text: 'Enable at-home diagnosis and care', value: 'Enable at-home diagnosis and care'},
        {key: 'vaccine-use', text: 'Encourage vaccine use', value: 'Encourage vaccine use'}
      ],
      skillsNeededOptions: [
        {key: 'nurse', text: 'Nurse', value: 'Nurse'},
        {key: 'developer', text: 'Developer', value: 'Developer'},
        {key: 'other', text: 'Other', value: 'Other'}
      ],
      teamActive: 1,
      submitting:false,
      created:false
    };
  }

  handleInputChange = (event) => {
    
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({submitting:true},()=>{
    nh4h.post('/solutions', {
      teamName: this.state.teamName,
      teamDescription: this.state.teamDescription,
      challengeName: this.state.challengeName
    }).then((resp)=>{
      console.log(resp);
      let teamid=resp.data.teamId;
      this.setState({created:true,submitting:false});
      this.props.JoinTeam('join',teamid);
      this.props.Callback();
    }); 
  });
  }

  render() {
    let valid=(
      this.state.challengeName 
      && this.state.teamName.trim()
      && this.state.teamDescription.trim());
      
      
    return(
      <div className="ui segment">
        {!this.state.created?
        <form onSubmit={this.handleSubmit} className="ui form">
          <div className="field">
            <label>Team Name</label>
            <input name="teamName" type="text" onChange={this.handleInputChange}/>
          </div>
          <div className="field">
            <label>Team description</label>
            <textarea name="teamDescription" rows="2" onChange={this.handleInputChange}></textarea>
          </div>
          <div className="field">
            <label>Skills Needed</label>
            <Dropdown placeholder='What skills do you need?' fluid multiple selection options={this.state.skillsNeededOptions} />
          </div>
          <div className="field">
            <label>Challenge</label>
            <Dropdown placeholder='Select a challenge category' fluid selection options={this.state.challengeNameOptions} />
          </div>
          <div className="ui basic segment">
            {this.state.submitting?
            <span className="ui">Submitting</span>
            :
            (valid?
              <button className="ui primary button" type="submit">Create Team</button>
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