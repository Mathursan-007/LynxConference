import React from "react";
import '../styles/payment.css'
import axios from "axios";
class Payment extends React.Component{



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
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }






    render() {
        return(
            <div>
                <div className={"payment-body"}>
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12">
                                <div className="card mx-auto">
                                    <p className="heading">PAYMENT DETAILS</p>
                                    <form className="card-details " onSubmit={this.handleSubmit}>
                                        <div className="form-group mb-0">
                                            <p className="text-warning mb-0">Card Number</p><br/>
                                            <input type="text" name="card-num" placeholder="1234 5678 9012 3457"
                                                   size="17" id="cno" minLength="16" maxLength="16"/>

                                        </div>
                                        <div className="form-group">
                                            <p className="text-warning mb-0">Cardholder's Name</p>
                                            <input type="text" name="name" placeholder="Name" size="17"/>
                                        </div>
                                        <div className="form-group pt-2">
                                            <div className="row d-flex">
                                                <div className="col-sm-4">
                                                    <p className="text-warning mb-0">Expiration</p>
                                                    <input type="text"   name="exp" placeholder="MM/YYYY" size="7"
                                                           id="exp" minLength="7" maxLength="7"/>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p className="text-warning mb-0">Cvv</p>
                                                    <input type="password" name="cvv"
                                                           placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3"
                                                           maxLength="3"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <p className="text-warning mb-0">Cardholder's Name</p>
                                                <input type="text" name="amount" value={this.props.location.state.price}  size="17" disabled={true}/>
                                            </div>
                                                <div className="col-sm-5 pt-0">
                                                    <button className="paymenbtn" type="submit"><i>Confirm Payment</i></button>
                                                </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default Payment;