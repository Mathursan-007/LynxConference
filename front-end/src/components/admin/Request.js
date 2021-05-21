import React from 'react'
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";



class Request extends React.Component {

    state={
        show:false
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
                    <p>{this.props.request.content}</p>
                </ModalBody>
                <Modal.Footer>
                    <Button className={"btn-dark"}>Approve</Button>
                    <Button className={"btn-danger"}>Reject</Button>
                    <Button onClick={()=>this.setState({show:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

        )

    }


   render() {

        return(
            <div>
                <tr>
                    <td>{this.props.request.id}</td>
                    <td>{this.props.request.title}</td>
                    <td>{this.props.request.status}</td>
                    {this.props.request.status==="approved" ?
                        <td><button>View</button></td> :
                        <td><button onClick={()=>this.setState({show:true})}>View</button></td>
                    }
                </tr>
                {this.showView()}

            </div>
        )
    }




}

export default Request;