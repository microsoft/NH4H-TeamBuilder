import React from 'react';
import {NavLink} from 'react-router-dom';

class TeamListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: -1,
      teamName: '',
      teamDescription: ''
    }
  }

  render() {

    const teamUrl = "/team/"+ this.props.teamId;

    return(
      <tr>
        <td>{this.props.teamId}</td>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td>&nbsp;</td>
        <td className="right aligned collapsing">
        <NavLink to={teamUrl}>Details</NavLink>
        </td>
      </tr>
    )
  }
}

export default TeamListItem;