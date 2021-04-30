import React from 'react';
import nh4h from '../apis/nh4h';
import { Card, Button } from 'semantic-ui-react'
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
        
          <Card fluid color='teal'>
            <Card.Content>
              {!this.props.isTeamMember? 
                (!this.props.hasTeam? <Button  floated='right' basic color="green" onClick={()=>{this.props.Callback(true,this.props.id)}}>Join</Button>: '' )            
                :              
                  <div>
                    <Button floated='right' basic color='red' onClick={()=>{this.props.Callback(false,this.props.id)}}>Leave</Button>                               
                    <Button floated='right' basic color='blue' onClick={()=>{this.props.edit()}}>Edit</Button>
                  </div>                
              }
              <Card.Header>
              {this.props.msTeamsChannel} : {this.props.name}                                    
              </Card.Header>
                         
              <Card.Description>
              <strong>{this.props.description}
                <br></br><br></br>

               We are looking for people with the following skills:</strong> {this.props.skills}
                <br/>
              </Card.Description>    
            </Card.Content>
          </Card>      
    )
  }
}

export default TeamListItem;