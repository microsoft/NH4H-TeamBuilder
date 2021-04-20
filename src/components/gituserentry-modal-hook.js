import React, { useState } from 'react'
import gitapi from '../apis/gitapi';
import { Button, Modal, Input, Dropdown, Menu, Icon, Label, Grid, Form, Divider } from 'semantic-ui-react'
import GitHubUserEntry from './gituserentry-modal';
import nh4h from '../apis/nh4h';

 
function modalReducer (state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer, size: action.size }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function test(event) {
  alert('call me');
}
const GitHubUserEntryHook = () => {
  const [usercount, setCount] = useState(0);
  const [username, setName] = useState(" ");
  const [ghuserlist, setUserList] = useState([]);
  const [isFetching, setFetchStatus] = useState(false);
  const [state, dispatch] = React.useReducer(modalReducer, 
    {
      open: true,
      dimmer: 'blurring',
      size: 'tiny',
      type:"OPEN_MODAL"
    }
  )
  const {dimmer, open, size} = state;
  var count;

  const handleUserInput = (event, data) => {
    setFetchStatus(true);
    getGitHubUser(count);    
  };

  const letsgo = (event, data) => {
    var letsgobutton = document.getElementById("letsgo");
    letsgobutton.className = "ui positive button";
  }

  const getGitHubUser = (event, data) => {    
    var userdropdown = document.getElementById("userdropdown");
    //var ghuser = userdropdown.getElementsByTagName("input")[0].value;
    //setName(userdropdown.getElementsByTagName("input")[0].value)
    var ghuser = document.getElementById("gituserid-input").value;
    var tempghuserlist = [];
    
    gitapi.get("/users?q=" + ghuser + "&per_page=100").then((resp) => {
      
      setCount(resp.data.total_count);
      console.log("totalcount:", usercount)
      console.log(resp.data)
      resp.data.items.map(i => {
        tempghuserlist.push({ key: i.login , text: i.login , value: i.login, image: { avatar: true, src: i.avatar_url }});
        setFetchStatus(false);
        setUserList(tempghuserlist)
        document.getElementById("displayusers").style["display"] = ""
      })       
      
    }).catch (err => {
      setFetchStatus(false);
      console.log("i'm err:", username)
    })
  }
  
  const saveGitUserId = () => {
    dispatch({ type: 'CLOSE_MODAL' })
    // nh4h.post().then((resp) => {
    //   dispatch({ type: 'CLOSE_MODAL' })
    // }).catch((err) => {

    // });
  };

  return (
    <div>
      <Modal
        dimmer={dimmer}
        open={open}
        size={size}
        // onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>Do you have a GitHub Account?</Modal.Header>
        <Modal.Content>
          <div className="ui ">
            <Form>
              <Form.Field>
                <Input id="gituserid-input" label='@' placeholder='Search username' action={{ onClick: () => getGitHubUser(), icon:"search" }} />
                <Label pointing>
                  Don't have one? It's easy! Here's <a href="https://github.com/join">how</a> :)
                </Label> <br /><br />
                
              </Form.Field>
              <Form.Field id="displayusers" style={{"display": "none"}}>
                <Divider />
                <Label color='teal' pointing="right">Select your username: </Label>
                <Menu compact>
                  <Dropdown placeholder='Select your user' onChange={letsgo} options={ghuserlist} simple item />
                </Menu>      
              </Form.Field>
            </Form>
          </div>   
          
        </Modal.Content>
        <Modal.Actions>
          <Button id="letsgo" className="disabled inactive" positive onClick={() => { saveGitUserId(); }}>
            I'm ready!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
export default GitHubUserEntryHook