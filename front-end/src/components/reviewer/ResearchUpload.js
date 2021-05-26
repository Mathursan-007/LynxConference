import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';

export default class ResearchUpload extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        show:false
    }

    showView=(url)=>{

        return(

            <Modal show={this.state.show} centered={true} >
                <ModalHeader>
                    <ModalTitle>
                        {this.props.upload.title}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Category : {this.props.upload.category}</p>
                    <p>Status : {this.props.upload.status}</p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><Button className="btn-dark">View Research Paper</Button></a>
                    <Button className={"btn-success"}>Approve</Button>
                    <Button className={"btn-danger"}>Reject</Button>
                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }

    render() {
        const {upload} = this.props;

        return (
            <tr>
                <td class="rev-td">{upload.id}</td>
                <td class="rev-td">{upload.title}</td>
                <td class="rev-td">{upload.category}</td>
                <td class="rev-td">{upload.status}</td>

                {this.props.upload.status==="approved" ?
                    <td class="rev-td"><button>View</button></td> :
                    <td class="rev-td"><button className="rev-btn-primary"
                                               onClick={()=>this.setState({show:true})}>View</button></td>
                }
                {this.showView(upload.url)}
            </tr>
        );
    }
}