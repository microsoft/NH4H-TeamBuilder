import React from 'react';

class UserListItem extends React.Component {
  render() {
    //Determine if user is a devup user or a guest.  create correct URL
    let teamschatlink = 'https://teams.microsoft.com/l/chat/0/0?users=' + this.props.userMSTeamsEmail.replace('@','_') + '%23EXT%23%40devupconforg2.onmicrosoft.com';
    if (this.props.userMSTeamsEmail.includes("devupconf.org")) {teamschatlink = 'https://teams.microsoft.com/l/chat/0/0?users=' + this.props.userMSTeamsEmail;}



    return(
      <div className="blue card">
        <div className="content">
          <div className="header">{this.props.userDisplayName}</div>
        </div>
        <div className="content">
          <strong>My Skills: </strong><br/>
          {this.props.mySkills}
          <br/><br/>
          <span className="right floated">
            <a href={teamschatlink}>          
              <i className="chat icon nowrap"></i>
              Chat with {this.props.userDisplayName}</a>            
          </span>
        </div>
      </div>
    )
  }
}

export default UserListItem;