import React, { useState } from 'react'
import gitapi from '../apis/gitapi';
import { Button, Modal, Input, Dropdown } from 'semantic-ui-react'
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
  console.log("ho")
  const [username, setName] = useState(" ");

  const [state, dispatch] = React.useReducer(modalReducer, 
    {
      open: true,
      dimmer: 'blurring',
      size: 'tiny',
      type:"OPEN_MODAL"
    }
  )
  const {dimmer, open, size} = state;

  const handleUserInput = event => {
    gitapi.get("/" + event.target.value).then((resp) => {
      console.log(resp)
    })
  };

  const getGitHubUser = () => {
    gitapi.get("/" + username).then((resp) => {

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
        
          <div className="ui icon input">
            <Input onChange={handleUserInput} id="gituser-id" label='@' placeholder='Username' /><i aria-hidden="true" onClick={() => getGitHubUser()} className="search circular link icon"></i>
          </div> <br /><br />
          
          Don't have one? It's easy! Here's <a href="https://github.com/join">how</a> :) <br /><br />
        </Modal.Content>
        <Modal.Actions>
          <Button className="disabled inactive" positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            I'm ready!
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}
export default GitHubUserEntryHook