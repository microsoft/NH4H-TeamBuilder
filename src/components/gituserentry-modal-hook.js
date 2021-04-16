import React, { useState } from 'react'
import gitapi from '../apis/gitapi';
import { Button, Modal, Input, Dropdown, Icon } from 'semantic-ui-react'
import GitHubUserEntry from './gituserentry-modal';

 
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

const GitHubUserEntryHook = () => {
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

  const handleUserInput = (event, data) => {
    console.log("event:", event)
    setName(data.searchQuery)
    if(username.length >=2) {
      setFetchStatus(true);
      setTimeout(getGitHubUser, 2000);
    }
    
  };

  const letsgo = (event, data) => {
    var letsgobutton = document.getElementById("letsgo");
    letsgobutton.className = "ui positive button";
  }

  const getGitHubUser = () => {
    
    var tempghuserlist = [];
    gitapi.get("/users?q=" + username).then((resp) => {
      resp.data.items.map(i => {
        tempghuserlist.push({ key: i.login , text: i.login , value: i.login, image: { avatar: true, src: i.avatar_url }});
        setFetchStatus(false);
        setUserList(tempghuserlist)
      })       
    }).catch (err => {

    })
  }
  
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
            <Dropdown
              button
              border
              fluid
              className='icon'
              floating
              labeled
              onSearchChange={handleUserInput}
              onChange={letsgo}
              icon='at'
              options={ghuserlist}
              search
              placeholder='Search Github User'
              loading={isFetching}
            />
          {/* <Input onChange={handleUserInput} id="gituser-id" label='@' placeholder='Username' /><i aria-hidden="true" onClick={() => getGitHubUser()} className="search circular link icon"></i>*/}
          </div>   
          <br /><br />
          Don't have one? It's easy! Here's <a href="https://github.com/join">how</a> :) <br /><br />
        </Modal.Content>
        <Modal.Actions>
          <Button id="letsgo" className="disabled inactive" positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            I'm ready!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
export default GitHubUserEntryHook