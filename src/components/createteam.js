import React from 'react';
import { Dropdown } from 'semantic-ui-react'


class TeamForm extends React.Component {
  constructor(props){
    super(props);
    let name='';
    let desc='';
    let skills='';
    let chall='';  //Education, Communication
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
        {key: 'Education', text: 'Vaccine Education & Delivery',value:'Vaccine Education & Delivery'},
        {key: 'MedicalDeserts', text: 'Medical Deserts', value: 'Medical Deserts'},
        {key: 'Equity', text: 'Health Equity & Racial Disparities', value: 'Health Equity & Racial Disparities'},
        {key: 'Care', text: 'New Models and Settings for Care', value: 'New Models and Settings for Care'},
        {key: 'Open', text: 'Open Topic', value: 'Open Topic'}
      ],
      skillsWanted:skills,
      teamActive: 1,
      submitting:false,
      created:false
    };
  }
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.team !== this.props.team){
      if(this.props.team){
        let t=this.props.team;
        let name=t.teamName;
        let desc=t.teamDescription;
        let chall=t.challengeName;
        console.log(chall);
        this.setState ({
          teamName: name,
          teamDescription: desc,
          challengeName: chall
        });
      }   
    }
  
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
    let body={
      teamName: this.state.teamName,
      teamDescription: this.state.teamDescription,
      challengeName: this.state.challengeName,
      skillsWanted: this.state.skillsWanted
    }
    this.props.createTeam(body);
  }

  editTeam=()=>{
    let body={
      teamName: this.props.team.teamName,
      teamDescription: this.state.teamDescription,
      challengeName: this.state.challengeName,
      skillsWanted: this.state.skillsWanted
    };
    this.props.editTeam(body);   
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
    
    //Check if all fields have been populated
    let valid=(
      this.state.challengeName!==''
      && this.state.teamName.trim()!==''
      && this.state.teamDescription.trim()!==''      
      );
      
      
    return(
      <div hidden={!this.props.visible} className="ui segment">                
        {!this.state.created?
        <form onSubmit={this.handleSubmit} className="ui form">
          {!this.props.team?"":
          <div className="field">            
            <h2>{this.state.teamName}</h2>
          </div>
          }
          {this.props.team?"":
          <div className="field">
            <label>Challenge Area</label>
            <Dropdown name="challengeName" placeholder='Select a challenge' fluid selection options={this.state.challengeNameOptions}  onChange={this.handleInputChange} defaultValue={this.state.challengeName} />
          </div>
          }
          
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
            <label>We are looking for people with these skills (comma seperated (ex: C#, HIPPA, EPIC)</label>
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