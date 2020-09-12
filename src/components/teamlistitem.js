import React from 'react';
import {NavLink} from 'react-router-dom';

class TeamListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    

    return(
      <tr>
        <td>        
          <button onClick={()=>{this.props.Callback('join',this.props.id)}} className="ui positive button">Join</button>
          <button onClick={()=>{this.props.Callback('leave',this.props.id)}} className="ui red button">Leave</button></td>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td>&nbsp;</td>
        <td className="right aligned collapsing">
        placeholder
        </td>
      </tr>
    )
  }
}

export default TeamListItem;