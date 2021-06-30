import React from "react";
import '../styles/payment.css'
import axios from "axios";
import Popup from "./PopUp";
class Payment extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            errorMessage:false,
            popMessage:''

        }
    }

    handleSubmit=(e)=>{

        e.preventDefault();

        const attendee ={

            fullName: this.props.location.state.name,
            email: this.props.location.state.email,
            phoneNumber: this.props.location.state.phoneNo,
            plan: this.props.location.state.plan,
            price:this.props.location.state.price

        };



        axios.post('http://localhost:5000/user/addAttendee', attendee)
            .then(res => {
                this.setState({errorMessage:true,popMessage:'Payment Successful'})
                window.location = "/"
            })

            .catch(err => {
                console.log(err);
            });

    }






    render() {
        return(
            <div>
                <div className="payment-body">
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12">
                                <div className="card cards mx-auto">
                                    <p className="payment-heading">PAYMENT DETAILS</p>
                                    <form className="payment-card-details " onSubmit={this.handleSubmit}>
                                        <div className="payment-form-group mb-0">
                                            <p className="payment-text-warning mb-0">Card Number</p><br/>
                                            <input type="text" className="payment-input" name="card-num" placeholder="1234 5678 9012 3457"
                                                   size="17" id="payment-cno" minLength="16" maxLength="16"/>

                                        </div>
                                        <div className="payment-form-group">
                                            <p className="payment-text-warning mb-0">Cardholder's Name</p>
                                            <input type="text" className="payment-input" name="name" placeholder="Name" size="17"/>
                                        </div>
                                        <div className="payment-form-group pt-2">
                                            <div className="row d-flex">
                                                <div className="col-sm-6">
                                                    <p className="payment-text-warning mb-0">Expiration</p>
                                                    <input type="text" className="payment-input" placeholder="04/2021" name="exp"size="17"
                                                           id="exp" minLength="7" maxLength="7"/>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p className="payment-text-warning mb-0">CVV</p>
                                                    <input type="password" className="payment-input" name="cvv"
                                                           placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3"
                                                           maxLength="3"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <p className="payment-text-warning mb-0">Amount</p>
                                                <input type="text" name="amount" value={this.props.location.state.price}  size="17" disabled={true}/>
                                            </div>
                                            <div className="payment-col-sm-5 pt-0">
                                                <button className="payment-btn" type="submit"><i>Confirm Payment</i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Popup

                    description = {this.state.popMessage}
                    show={this.state.errorMessage}
                    onHide={() => this.setState({errorMessage: false})}
                />
            </div>

        )
    }
}
export default Payment;
