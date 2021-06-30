import React from 'react'
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import WorkShopRequest from "./WorkShopRequest";
import KeynoteRequest from "./KeynoteRequest";
import axios from "axios";
import NewsRequest from "./NewsRequest";
import TemplateRequest from "./TemplateRequest";
import ConferenceDetailsRequest from "./ConferenceDetailsRequest";
import CallForPaperDetailsRequest from "./CallForPaperDetailsRequest";


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
            return (<div><NewsRequest request={this.props.request} /></div>)
        } else if(this.props.request.type === 'template') {
            return (<div><TemplateRequest request={this.props.request}/></div>)
        } else if(this.props.request.type === 'workshop') {
            return (<WorkShopRequest request={this.props.request} />)
        } else if(this.props.request.type === 'conference') {
            return (<div><ConferenceDetailsRequest request={this.props.request}/></div>)
        } else if(this.props.request.type === 'call for paper') {
            return (<div><CallForPaperDetailsRequest request={this.props.request}/></div>)
        }
    }


    reply=(reply)=>{

        axios.patch(`http://localhost:5000/admin/reply/${this.props.request._id}`,{reply},{
            headers:{
                Authorization:localStorage.getItem("token")
            }
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

        if(this.state.status=="approved"||this.state.status=="rejected"){
            return true;
        }else if(this.state.status=="pending"){
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
                <tr>
                    <td>{this.props.num}</td>
                    <td>{this.props.request.type}</td>
                    <td>{this.state.status}</td>
                    <td><button class="rev-btn-primary" onClick={()=>this.setState({show:true})}>View</button></td>
                    {this.showView()}
                </tr>


        )
    }


}
export default Request;