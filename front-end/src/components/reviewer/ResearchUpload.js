import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';
import axios from "axios";
import Popup from "../PopUp"
import swal from "sweetalert";

export default class ResearchUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            status: this.props.upload.status,
            show:false,
            reviewerID: this.props.upload.reviewerID,
            errorMessage:false,
            popMessage:''
        }
    }

    changeStatus=(_id, msg) => {

        axios.patch('http://localhost:5000/reviewer/upload/' + _id, {status:msg,reviewerID:this.state.reviewerID,
                                    email:this.props.upload.details.email,type:"research"},{
             headers:{
                 Authorization:localStorage.getItem("token")
             }
        } )
            .then(response => {

                this.setState({status: msg,show:false});
                swal("Successfully " + this.state.status + " Submission!");

            })
            .catch(err => {
                console.log(err);
            })
    }

    clickEvent=()=>{

        if(this.state.status=="approved"||this.state.status=="rejected"){
            return true;
        }else if(this.state.status=="pending"){
            return false;
        }

    }

    getButton(status) {
        if(status === "approved") {
            return (
                <button className="rev-btn-status-approve">Approved</button>
            )
        }
        else if (status === "rejected") {
            return (
                <button className="rev-btn-status-reject">Rejected</button>
            )
        }
        else {
            return (
                <button className="rev-btn-status-pending">Pending</button>
            )
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
                    <p>Reviewed By : <input type="text" name="reviewerID" className="rev-id" placeholder="Please enter your ID"
                                    value={this.state.reviewerID} onChange={this.handleInput} /> </p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><button className="rev-btn-url">View Research Paper</button></a>
                    <button className="rev-btn-approve" onClick={()=>this.changeStatus(this.props.upload._id, "approved")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Approve</button>
                    <button className="rev-btn-reject" onClick={()=>this.changeStatus(this.props.upload._id, "rejected")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Reject</button>
                    <Button className="rev-btn-close" onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }

    render() {
        const {upload} = this.props;


        return (
            <tr>
                {/*<td class="rev-td">{upload._id}</td>*/}
                <td className="rev-td">{this.props.num}</td>

                {/*TODO : Add the title and category*/}

                <td className="rev-td">{upload.details.email}</td>
                <td className="rev-td">{upload.details.phoneNumber}</td>
                <td className="rev-td">{upload.stacks}</td>
                <td className="rev-td">{this.getButton(this.state.status)}</td>

                {/*{this.props.upload.status=="approved" ?*/}
                {/*    <td className="rev-td"><button>View</button></td> :*/}
                    <td className="rev-td"><button className="rev-btn-view"
                                               onClick={()=>this.setState({show:true})}>View</button></td>
                {/* }*/}
                {this.showView(upload.details.paper)}
            </tr>
        );
    }
}