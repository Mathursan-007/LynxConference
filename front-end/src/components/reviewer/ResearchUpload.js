import React from 'react';
import {render} from 'react-dom';
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import '../../styles/ReviewerResearchUploads.css';
import axios from "axios";

export default class ResearchUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            status: this.props.upload.status,
            show:false,
            reviewerID: this.props.upload.reviewerID
        }
    }

    changeStatus=(_id, msg) => {

        axios.patch('http://localhost:5000/reviewer/upload/' + _id, {status:msg,reviewerID:this.state.reviewerID,
                                    email:this.props.upload.details.email,type:"research"},{
             headers:{
                 Authorization:sessionStorage.getItem("token")
             }
        } )
            .then(response => {

                this.setState({status: msg,show:false});

            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInput=(event)=>{
        this.setState({reviewerID: event.target.value});
    }

    clickEvent=(status, reviewerID)=>{

        const str = reviewerID + "";
        const length = str.length;
        console.log("ID: " , length);
       // const length = reviewerID+"".toString().length;


        if( (status=="approved" || status=="rejected" || length<6) ) {
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
                        {this.props.upload.title}
                    </ModalTitle>
                    <input type="text" name="reviewerID" placeholder="Reviewer, Please enter your ID" onChange={this.clickEvent(this.state.status, this.state.reviewerID)} />
                </ModalHeader>
                <ModalBody>
                    <p>Researcher Name : {this.props.upload.details.name}</p>
                    <p>Researcher Email : {this.props.upload.details.email}</p>
                    <p>Researcher Contact : {this.props.upload.details.phoneNumber}</p>
                    <p>Reviewed By : <input type="text" name="reviewerID" className="rev-id" placeholder="Please enter your ID"
                                    value={this.state.reviewerID} onChange={this.handleInput} /> </p>
                </ModalBody>
                <Modal.Footer>
                    <a href={url}><Button className="btn-dark">View Research Paper</Button></a>
                    <Button className={"rev-btn-approve"} onClick={()=>this.changeStatus(this.props.upload._id, "approved")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Approve</Button>
                    <Button className={"rev-btn-reject"} onClick={()=>this.changeStatus(this.props.upload._id, "rejected")}
                            disabled={this.clickEvent(this.state.status, this.state.reviewerID)}>Reject</Button>
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
                <td className="rev-td">{this.props.num}</td>

                {/*TODO : Add the title and category*/}

                <td className="rev-td">{upload.details.email}</td>
                <td className="rev-td">{upload.details.phoneNumber}</td>
                <td className="rev-td">{upload.stacks}</td>
                <td className="rev-td">{this.state.status}</td>

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