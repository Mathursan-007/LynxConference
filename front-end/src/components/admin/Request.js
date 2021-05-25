import React from 'react'
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import WorkshopRequest from "./WorkshopRequest";
import KeynoteRequest from "./KeynoteRequest";
import axios from "axios";
import NewsRequest from "./NewsRequest";
import TemplateRequest from "./TemplateRequest";
import ConferenceDetailsRequest from "./ConferenceDetailsRequest";


class Request extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            show:false,
            status: this.props.request.status
        }
    }




    selectView = () => {
        if(this.props.request.type === 'keynote') {
            return (<KeynoteRequest request={this.props.request} />)
        } else if(this.props.request.type === 'news') {
            return (<div><NewsRequest/></div>)
        } else if(this.props.request.type === 'template') {
            return (<div><TemplateRequest/></div>)
        } else if(this.props.request.type === 'workshop') {
            return (<WorkshopRequest request={this.props.request} />)
        } else if(this.props.request.type === 'conference') {
            return (<div><ConferenceDetailsRequest/></div>)
        }
    }


    reply=(reply)=>{
        axios.patch(`http://localhost:5000/admin/reply/${this.props.request._id}`,{
            status:reply
        })
            .then(response=>{

                this.setState({status: reply});
                this.setState({show:false});

            })
            .catch(error=>{
                console.log(error)
            })
    }

    checkStatus=()=>{

        if(this.props.request.status=="approved"||this.props.request.status=="rejected"){
            return true;
        }else if(this.props.request.status=="pending"){
            return false;
        }

    }

    showView=()=>{

        return(

            <Modal show={this.state.show} centered={true} >
                <ModalHeader>
                    <ModalTitle>
                        {this.props.request.title}
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {this.selectView()}
                </ModalBody>
                <Modal.Footer>

                    <Button className={"btn-dark"} onClick={()=>this.reply("approved")} disabled={this.checkStatus()} >Approve</Button>
                    <Button className={"btn-danger"} onClick={()=>this.reply("rejected")} disabled={this.checkStatus()} >Reject</Button>
                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return(
            <div>
                <tr>
                    <td>{this.props.request._id}</td>
                    <td>{this.props.request.type}</td>
                    <td>{this.state.status}</td>
                    <td><button onClick={()=>this.setState({show:true})}>View</button></td>
                </tr>
                {this.showView()}
            </div>
        )
    }


}
export default Request;