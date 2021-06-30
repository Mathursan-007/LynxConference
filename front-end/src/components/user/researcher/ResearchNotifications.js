import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import '../../../styles/ReviewerResearchUploads.css';
import PopUp from '../../PopUp'



export default class ResearchNotifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            researchUploads: {},
            email: '',
            _id: '',
            paymentStatus: ''
        }
    }


    componentDidMount() {
        console.log("received research props: ", this.props.researchUploads);
        this.setState( {researchUploads: this.props.researchUploads});
        this.setState( {email: this.props.researchUploads.user});
        this.setState( {_id: this.props.researchUploads._id});
        this.setState( {paymentStatus: this.props.researchUploads.details.paymentStatus});
    }


    navigateToPaymentPage(email, id) {
        window.location = `/researcher/payment/${email}/${id}`
    }

    showResearchNotification() {

        if (this.state.researchUploads.status === "approved") {

            if (this.state.paymentStatus === "paid") {

                return (

                    <div>
                        <h1>Submission Status</h1>
                        <h3>This is to inform you that your Research Paper Submission has
                            been {this.state.researchUploads.status}</h3>

                        <h3>You have made the Payment Successfully!</h3>

                        <Button disabled={this.state.researchUploads.details.paymentStatus === "paid" ? true : false}
                                onClick={() => this.navigateToPaymentPage(this.state.email, this.state._id)}
                                className="rev-btn-payment">Proceed To Payment</Button>

                    </div>
                )
            } else {
                return (

                    <div>
                        <h1>Submission Status</h1>
                        <h3>This is to inform you that your Research Paper Submission has
                            been {this.state.researchUploads.status}</h3>

                        <h3>Proceed with making the payment to publish your research at the Conference</h3>

                        <Button disabled={this.state.researchUploads.details.paymentStatus === "pending" ? true : false}
                                onClick={() => this.navigateToPaymentPage(this.state.email, this.state._id)}
                                className="rev-btn-payment">Proceed To Payment</Button>

                    </div>
                )
            }

        } else if (this.state.researchUploads.status === "rejected") {
            return (

                <div>
                    <h1>Submission Status</h1>
                    <h3>This is to inform you that your Research Paper Submission has
                        been {this.state.researchUploads.status}</h3>
                </div>
            )
        } else if (this.state.researchUploads.status === "pending") {
            return (

                <div>
                    <h1>Submission Status</h1>
                    <h3>This is to inform you that your Research Paper Submission is yet to be reviewed...</h3>
                </div>
            )
        } else {
            return (
                <PopUp description={"No notifications"} show={this.state.show} onHide={()=>this.setState({show:false})}/>
            )

        }
    }

    render() {
        return (
            <div>

                <h1>Notifications</h1>

                {this.showResearchNotification()}

            </div>
        )
    }

}
