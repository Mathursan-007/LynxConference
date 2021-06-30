import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import '../../../styles/ReviewerResearchUploads.css';
import PopUp from '../../PopUp'

export default class WorkshopNotifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            workshopUploads: {},
            email: '',
            _id: '',
            show:true
        }
    }

    componentDidMount() {
        console.log("received workshop props: ", this.props.workshopUploads);
        this.setState( {workshopUploads: this.props.workshopUploads});
        this.setState( {email: this.props.workshopUploads.user});
        this.setState( {_id: this.props.workshopUploads._id});
    }


    showWorkshopNotification() {

        if(this.state.workshopUploads.status === "approved" || this.state.workshopUploads.status === "rejected") {
            return(

                <div>
                    <h1>Submission Status</h1>
                    <h3>This is to inform you that your Workshop Proposal Submission has been {this.state.workshopUploads.status}</h3>
                </div>
            )
        }
        else if (this.state.workshopUploads.status === "pending") {
            return(

                <div>
                    <h1>Submission Status</h1>
                    <h3>This is to inform you that your Research Paper Submission is yet to be reviewed...</h3>
                </div>
            )
        }
        else {
            return (
                <PopUp description={"No notifications"} show={this.state.show} onHide={()=>this.setState({show:false})}/>
            )
        }
    }

    render() {
        return (
            <div>


                {this.showWorkshopNotification()}


            </div>
        )
    }

}


