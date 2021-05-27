import React from "react";
import '../../styles/payment.css'
class Payment extends React.Component{

    render() {
        return(
            <div>
                <div className="body">
                    <div className="container-fluid">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12">
                                <div className="card mx-auto">
                                    <p className="heading">PAYMENT DETAILS</p>
                                    <form className="card-details ">
                                        <div className="form-group mb-0">
                                            <p className="text-warning mb-0">Card Number</p><br/>
                                            <input type="text" name="card-num" placeholder="1234 5678 9012 3457"
                                                   size="17" id="cno" minLength="19" maxLength="19"/>

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
                                                <div className="col-sm-5 pt-0">
                                                    <button type="button" className="btn btn-primary"><i
                                                        className="fa fa-arrow-right px-3 py-2"></i></button>
                                                </div>
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