import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';

export default class WorkshopUpload extends React.Component {

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
                        {this.props.workshopUpload.title}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Category : {this.props.workshopUpload.category}</p>
                    <p>Status : {this.props.workshopUpload.status}</p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><Button className="btn-dark">View Workshop Proposal</Button></a>
                    <Button className={"btn-success"}>Approve</Button>
                    <Button className={"btn-danger"}>Reject</Button>
                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }

    render() {
        const {workshopUpload} = this.props;

        return (
            <tr>
                <td class="rev-td">{workshopUpload.id}</td>
                <td class="rev-td">{workshopUpload.title}</td>
                <td class="rev-td">{workshopUpload.category}</td>
                <td class="rev-td">{workshopUpload.status}</td>

                {this.props.workshopUpload.status==="approved" ?
                    <td class="rev-td"><button>View</button></td> :
                    <td class="rev-td"><button className="rev-btn-primary"
                                               onClick={()=>this.setState({show:true})}>View</button></td>
                }
                {this.showView(workshopUpload.url)}
            </tr>
        );
    }
}

