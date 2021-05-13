import React from 'react';
import { Card, Button, Icon, Label, Header, Container, Menu, Segment, Divider, Grid } from 'semantic-ui-react'
//links to general of prod channel
const DEF_TEAMSLINK = 'https://teams.microsoft.com/l/channel/19%3a6c83ba5af8664dc3b1a0d8a8a0774094%40thread.tacv2/General?groupId=abc0763c-f446-424c-ba5f-e374147c11a0&tenantId=e773e193-89d3-44d9-ae4e-17766699f674';
class TeamListItem extends React.Component {



  getTeamsLink = () => {
    return this.props.teamslink ? this.props.teamslink : DEF_TEAMSLINK;
  }

  render() {
    const hackers = [];
    if (this.props.team) {
      for (let user of this.props.team.Users.hackers) {
        if (user.islead == 1) {
          hackers.push(<Label color='green' key={user.name}>{user.name}<Label.Detail>Lead</Label.Detail></Label>);
        } else {
          hackers.push(<Label color='blue' key={user.name}>{user.name}<Label.Detail>Member</Label.Detail></Label>);
        }
      }
    }

    let islead = this.props.islead ? this.props.islead === 1 : false;
    if (!this.props.team) { return ""; }
    return (
      <Card fluid>
        <Card.Content floated='left' header>

          <Header size='large' content={this.props.team.teamName} subheader={this.props.team.msTeamsChannel}></Header>


        </Card.Content>




        <Card.Content description>
          
            <Header as='h3' floated="left">
              Description
            </Header>
            <Divider clearing />
            <p>{this.props.team.teamDescription}</p>
         

          {/* <Divider horizontal>
          <Header as='h4' floated="left">
              Description
      </Header>
          </Divider>
          <p>
            {this.props.team.teamDescription}
          </p>
          <Divider horizontal>
            <Header as='h4'>
              Skills Wanted
      </Header>
          </Divider>
          <div>
          <Container textAlign='center'>
            <Label>
              <Icon name="js"/>
      JS
    </Label>
            <Label>
              <Icon name="css3"/>
      CSS
    </Label>
            <Label>
              <Icon name="heart"></Icon>
              Nurse Experience
    </Label>
         
          </Container> */}
          {/* </div> */}
          {/* <Menu attached='top' tabular>
            <Menu.Item
              name='Description'
              active={activeItem === 'Description'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Skills'
              active={activeItem === 'Skills'}
              onClick={this.handleItemClick}
            /> </Menu> */}

          {/* <Segment attached='bottom'>
            {this.props.team.teamDescription}
          </Segment> */}

        </Card.Content>
        <Card.Content extra>



          {!this.props.isTeamMember ?
            (!this.props.hasTeam ?
              <div>
                <Button size="mini" floated='right' basic color="green" onClick={() => { this.props.Callback(true, this.props.team.id, this.props.team.teamName) }}>Join</Button>
                <Icon name='user' aria-label="Members:" /> {hackers}
              </div>


              : '')
            :
            <div>
              <Icon name='user' aria-label="Members:" /> {hackers}


              <Button size="mini" floated='right' basic color='red' onClick={() => { this.props.Callback(false, this.props.team.id, this.props.team.teamName) }}>Leave</Button>
              <Button size="mini" floated='right' basic color='blue' onClick={() => { this.props.edit() }}>Edit</Button>

              {islead ?
                <Button size="mini" floated='right' color="red" onClick={() => { this.props.Callback(true, this.props.team.id, this.props.team.teamName, 0, 0) }} icon>
                  <Icon name='heart' />
                Don't Lead
              </Button>
                :
                <Button floated='right' color="green" onClick={() => { this.props.Callback(true, this.props.team.id, this.props.team.teamName, 0, 1) }} icon size="mini">
                  <Icon name='heart' />
                  Lead
                </Button>
              }
            </div>

          }

        </Card.Content>

      </Card>
    )
  }
}

export default TeamListItem;