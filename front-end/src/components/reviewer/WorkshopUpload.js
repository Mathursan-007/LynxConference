import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';
import axios from "axios";

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

        axios.patch('http://localhost:5000/reviewer/upload/' + _id, {status:msg,email:this.props.upload.details.email,type:"workshop"},{
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        } )
            .then(response => {
                this.setState({status: msg});
                this.setState({show:false});

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

                    <input type="text" name="reviewerID" placeholder="Reviewer, Please enter your ID" onChange={this.clickEvent(this.state.status, this.state.reviewerID)} />

                </ModalHeader>
                <ModalBody>
                    <p>Presenter Name : {this.props.workshopUpload.details.name}</p>
                    <p>Presenter Email : {this.props.workshopUpload.details.email}</p>
                    <p>Presenter Contact : {this.props.workshopUpload.details.phoneNumber}</p>

                    <p>Reviewed By : <input type="text" name="reviewerID" className="rev-id" placeholder="Please enter your ID"
                                            value={this.state.reviewerID} onChange={this.handleInput} /> </p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><Button className="btn-dark">View Workshop Proposal</Button></a>

                    <Button className={"btn-success"} onClick={()=>this.changeStatus(this.props.workshopUpload._id, "approved")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Approve</Button>

                    <Button className={"btn-danger"} onClick={()=>this.changeStatus(this.props.workshopUpload._id, "rejected")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Reject</Button>

                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }

    render() {
        const {workshopUpload} = this.props;

        return (
            <tr>
                <td class="rev-td">{this.props.num}</td>

                {/*TODO: Add the category and title*/}

                <td class="rev-td">{workshopUpload.details.email}</td>
                <td class="rev-td">{workshopUpload.details.phoneNumber}</td>
                <td class="rev-td">{this.state.status}</td>

                <td className="rev-td">
                    <button className="rev-btn-primary"
                            onClick={() => this.setState({show: true})}>View
                    </button>
                </td>
                {this.showView(workshopUpload.details.proposal)}
            </tr>
        );
    }
}

