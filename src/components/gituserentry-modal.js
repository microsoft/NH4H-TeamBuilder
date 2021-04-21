import React from 'react'
import gitapi from '../apis/gitapi';
import { Button, Modal, Input } from 'semantic-ui-react'

class GitHubUserEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      dimmer: 'blurring',
      size: 'tiny',
      type: 'OPEN_MODAL',
      username:''
    }
   
  }
  

  modalReducer = (state, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer, size: action.size }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()
    }
  }

  getGitHubUser = () => {
    alert(this.state.username);
  }

  dispatch = () => React.useReducer(this.modalReducer, 
    this.setState(
      {
        open: true,
        dimmer: 'blurring',
        size: 'tiny',
        type:"OPEN_MODAL"
      }
  ))

  render() {
    
    return (
      <div>
        <Modal
          dimmer={this.state.dimmer}
          open={this.state.open}
          size={this.state.size}
          // onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        >
          <Modal.Header>Do you have a GitHub Account?</Modal.Header>
          <Modal.Content>
          
            <div className="ui icon input"><Input onChange={this.handleUserInput} id="gituser-id" label='@' placeholder='Username' /><i aria-hidden="true" onClick={(() => this.getGitHubUser())} className="search circular link icon"></i></div> <br /><br />
            Don't have one? It's easy! Here's <a href="https://github.com/join">how</a> :) <br /><br />
          </Modal.Content>
          <Modal.Actions>
            <Button className="disabled inactive" positive onClick={() => this.dispatch({ type: 'CLOSE_MODAL' })}>
              I'm ready!
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}
export default GitHubUserEntry