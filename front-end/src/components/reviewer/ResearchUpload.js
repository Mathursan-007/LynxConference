import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';
import axios from "axios";

export default class ResearchUpload extends React.Component {

    constructor(props) {
        super(props);
    }

    state={
        status: this.props.upload.status,
        show:false
    }

    changeStatus=(_id, msg) => {

        axios.patch('http://localhost:5000/reviewer/upload/' + _id, {status:msg} )
            .then(response => {
                this.setState({status: msg});
                this.setState({show:false});

            })
            .catch(err => {
                console.log(err);
            })
    }

    clickEvent=()=>{

        if(this.props.upload.status=="approved"||this.props.upload.status=="rejected"){
            return true;
        }else if(this.props.upload.status=="pending"){
            return false;
        }

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
                    <p>Researcher Name : {this.props.upload.details.name}</p>
                    <p>Researcher Email : {this.props.upload.details.email}</p>
                    <p>Researcher Contact : {this.props.upload.details.phoneNumber}</p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><Button className="btn-dark">View Research Paper</Button></a>
                    <Button className={"btn-success"} onClick={()=>this.changeStatus(this.props.upload._id, "approved")}
                            disabled={this.clickEvent()}>Approve</Button>
                    <Button className={"btn-danger"} onClick={()=>this.changeStatus(this.props.upload._id, "rejected")}
                            disabled={this.clickEvent()}>Reject</Button>
                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }

    render() {
        const {upload} = this.props;

        return (
            <tr>
                {/*<td class="rev-td">{upload._id}</td>*/}
                <td className="rev-td">{upload.details.name}</td>

                {/*TODO : Add the title and category*/}

                <td className="rev-td">{"Research Title..."}</td>
                <td className="rev-td">{"Research Category..."}</td>

                <td className="rev-td">{upload.status}</td>

                {/*{this.props.upload.status=="approved" ?*/}
                {/*    <td className="rev-td"><button>View</button></td> :*/}
                    <td className="rev-td"><button className="rev-btn-primary"
                                               onClick={()=>this.setState({show:true})}>View</button></td>
                {/* }*/}
                {this.showView(upload.details.paper)}
            </tr>
        );
    }
}