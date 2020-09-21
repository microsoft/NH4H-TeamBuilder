import React from 'react';

class UserListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="teal card">
        <div className="content">
          <div className="header">{this.props.userName}</div>
        </div>
        <div className="content">
          {this.props.userSkills}
          <br/><br/>
        </div>
      </div>
    )
  }
}

export default UserListItem;