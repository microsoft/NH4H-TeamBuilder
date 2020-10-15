
import React from 'react';
import {NavLink} from 'react-router-dom';


class Menu extends React.Component {
  
  render() {
      let teams=this.props.team?"active item":"item";
      let user=!this.props.team?"active item":"item";
      return <div className="ui secondary pointing menu">
    <NavLink to="/"><a className={teams}>Teams</a></NavLink>
    <NavLink to="/users"><a className={user}>Users</a></NavLink>
    </div>;
  }
}

export default Menu;