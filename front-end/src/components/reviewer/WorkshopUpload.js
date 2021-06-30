import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';
import axios from "axios";
import swal from 'sweetalert'



export default class WorkshopUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            status: this.props.workshopUpload.status,
            show:false,
            reviewerID: ''
        }
    }



    changeStatus=(_id, msg) => {
        // console.log("em: ", this.props)
        axios.patch('http://localhost:5000/reviewer/upload/' + _id, {status:msg,reviewerID:this.state.reviewerID,
            email:this.props.workshopUpload.details.email,type:"workshop"},{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        } )
            .then(response => {
                console.log("res: ", response);
                this.setState({status: msg,show:false});
                swal("Successfully " + this.state.status + " Submission!");

            })
            .catch(err => {
                console.log(err);
            })
    }


    handleInput=(event)=>{
        this.setState({reviewerID: event.target.value});
    }

    clickEvent=(status, reviewerID)=>{

        // if(status=="approved"||status=="rejected"){
        //     return true;
        // }else if(status=="pending"){
        //     return false;
        // }

        const length = reviewerID.toString().length;
        console.log("length :", length);

        if( (status=="approved"||status=="rejected" || length<5 ) ) {
            return true;

        }else if( status=="pending" ) {
            return false;
        }

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
                    <p>Presenter Name : {this.props.workshopUpload.details.name}</p>
                    <p>Presenter Email : {this.props.workshopUpload.details.email}</p>
                    <p>Presenter Contact : {this.props.workshopUpload.details.phoneNumber}</p>

                    <p>Reviewed By : <input type="text" name="reviewerID" className="rev-id" placeholder="Please enter your ID"
                                            value={this.state.reviewerID} onChange={this.handleInput} /> </p>
                </ModalBody>
                <Modal.Footer>
                    <Modal.Footer>
                        <a href={url}><Button className="rev-btn-url">View Workshop Proposal</Button></a>

                        <button className="rev-btn-approve" onClick={()=>this.changeStatus(this.props.workshopUpload._id, "approved")}
                                disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Approve</button>

                        <button className="rev-btn-reject" onClick={()=>this.changeStatus(this.props.workshopUpload._id, "rejected")}
                                disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Reject</button>

                        <Button className="rev-btn-close" onClick={()=>this.setState({show:false})}>Close</Button>
                    </Modal.Footer>
                </Modal.Footer>
            </Modal>

        )

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


    render() {
        const {workshopUpload} = this.props;

        return (
            <tr>
                <td class="rev-td">{this.props.num}</td>

                {/*TODO: Add the category and title*/}

                <td class="rev-td">{workshopUpload.details.email}</td>
                <td class="rev-td">{workshopUpload.details.phoneNumber}</td>
                <td className="rev-td">{this.getButton(this.state.status)}</td>


                <td className="rev-td">
                    <button className="rev-btn-view"
                            onClick={() => this.setState({show: true})}>View
                    </button>
                </td>
                {this.showView(workshopUpload.details.proposal)}
            </tr>
        );
    }
}

