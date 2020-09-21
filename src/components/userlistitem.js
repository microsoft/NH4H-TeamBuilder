import React from 'react';

class UserListItem extends React.Component {
  render() {
    return(
      <div className="blue card">
        <div className="content">
          <div className="header">{this.props.userDisplayName}</div>
        </div>
        <div className="content">
          <strong>My Skills: </strong><br/>
          {this.props.mySkills}
          <br/><br/>
        </div>
      </div>
    )
  }
}

export default UserListItem;