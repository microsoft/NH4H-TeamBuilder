import React, { Component } from 'react';
import gitapi from '../apis/gitapi'
import { Form, Button, Icon } from 'semantic-ui-react';

const GITHUBAPIURL="/orgs/NurseHack4Health/invitations"
var obj_csv;
class InvitationForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          file: null,
          fileName: "",
          isUploading: false,
          statusCode: "",
          result:[]
        }
        obj_csv = {
            size:0,
            dataFile:[]
        };
    }

    onFormSubmit = e => {
        e.preventDefault(); // Stop form submit
        
        for (var item of this.state.result ) {
            this.sendEmail(item[2].split(":")[1], item[4].split(":")[1], item[3].split(":")[1]);
        }       
    };
        
    fileChange = e => {
        let csvData = [];
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsBinaryString(e.target.files[0]);
            var lines = [];
            reader.onload = function (e, callback) {
                // console.log(e);
                obj_csv.size = e.total;
                obj_csv.dataFile = e.target.result
                // console.log(obj_csv.dataFile);
                var allTextLines = obj_csv.dataFile.split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');
                // var lines = [];
            
                for (var i=1; i<allTextLines.length; i++) {
                    var data = allTextLines[i].split(',');
                    if (data.length == headers.length) {
            
                        var tarr = [];
                        for (var j=0; j<headers.length; j++) {
                            tarr.push(headers[j]+":"+data[j]);
                        }
                        lines.push(tarr);
                    }
                }
            }

            this.setState( {result: lines});
        }
        this.setState(
          { file: e.target.files[0], fileName: e.target.files[0].name },
          () => {
            console.log(
              "File chosen --->",
              this.state.file,
              console.log("File name  --->", this.state.fileName)
            );
          }
        );
    };

    sendEmail = (teamId, ghId, ghUser) => {
        var body = {
            team_ids: [parseInt(teamId)],
            invitee_id: parseInt(ghId)
        }
        gitapi.post(GITHUBAPIURL, body).then(resp => {
            console.log("Sent invitations for:", ghUser)
        });
    }
    
    processData = (allText) => {
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
    
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
    
                var tarr = [];
                for (var j=0; j<headers.length; j++) {
                    tarr.push(headers[j]+":"+data[j]);
                }
                lines.push(tarr);
            }
        }
        // alert(lines);
    }

    render() {
       
        return(
            <div>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>File upload </label>
                        <Button as="label" htmlFor="file" type="button" animated="fade">
                        <Button.Content visible>
                            <Icon name="file" />
                        </Button.Content>
                        <Button.Content hidden>Choose a File</Button.Content>
                        </Button>
                        <input
                        type="file"
                        id="file"
                        hidden
                        onChange={this.fileChange}
                        />
                        <Form.Input
                            fluid
                            label="File Chosen: "
                            placeholder="Use the above bar to browse your file system"
                            readOnly
                            value={this.state.fileName}
                        />
                        <Button style={{ marginTop: "20px" }} type="submit">
                            Upload
                        </Button>
                    </Form.Field>
                </Form>
                <div>
                </div>
            </div>
        );
    }
}

export default InvitationForm;