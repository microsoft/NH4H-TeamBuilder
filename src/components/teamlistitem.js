import React from 'react';

class TeamListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <tr>
        <td>{this.props.teamid}</td>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td className="right aligned collapsing"><a href="#">Details</a></td>
      </tr>
    )
  }
}

export default TeamListItem;