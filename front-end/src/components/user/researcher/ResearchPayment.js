import React, {Component} from "react";
import axios from "axios";
import '../../../styles/ResearchPayment.css'
import swal from 'sweetalert'



export default class ResearchPayment extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: '',
            researchPaperID: '',
            researchPaperPrice: 25000.00,
            cardHolderName: '',
            cardNumber: '',
            cvv: '',
            expiryDate: '',
            paymentStatus: ''
        };
    }

    componentDidMount() {
        this.setState( {email: this.props.match.params.email});
        this.setState( {researchPaperID: this.props.match.params.id});
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let payment = {
            email: this.state.email,
            researchPaperID: this.state.researchPaperID,
            cardHolderName: this.state.cardHolderName,
            cardNumber: this.state.cardNumber,
            cvv: this.state.cvv,
            expiryDate: this.state.expiryDate,
            price: this.state.researchPaperPrice
        };
        console.log('DATA to send : ', payment);

        axios.post('http://localhost:5000/user/addPayment', payment, {
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(response => {
                console.log('Payment added successfully!');
                console.log("Added data: ", response);
                this.setState( {paymentStatus: 'paid'});
                this.UpdatePaymentStatus();
            })
            .catch(error => {
                console.error(error);
            });
    }

    UpdatePaymentStatus() {
        axios.patch('http://localhost:5000/reviewer/upload/payment/' + this.state.researchPaperID,
            {status:"paid"} ,{
                headers:{
                    Authorization:sessionStorage.getItem("token")
                }
            })
            .then(response => {

                swal("Payment made Successfully!");

            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return(
            <div className="payment-container">
                <h2 className="py-heading">Payment Details</h2>
                <hr className="hrStyles"/>
                <br/>
                <form onSubmit={this.onSubmit}>

                    <label className="py-label">Card Number</label><br/>
                    <input type="text" name="cardNumber" placeholder="1234 5678 9012 3457" className="py-input"
                           size="17" id="cardNumber" minLength="16" maxLength="16" onChange={this.onChange} required/>
                    <br/><br/>

                    <label className="py-label">Cardholder's Name</label><br/>
                    <input type="text" name="cardHolderName" placeholder="Name" size="17" className="py-input"
                           onChange={this.onChange} required/>
                    <br/><br/>

                    <div className="row d-flex">
                        <div className="col-sm-4">
                            <label className="py-label">Expiration</label>
                            <input type="text"   name="expiryDate" placeholder="MM/YYYY" size="7" className="py-input"
                                   id="expiryDate" minLength="7" maxLength="7" onChange={this.onChange} required/>
                        </div>
                        <div className="col-sm-3">
                            <label className="py-label">Cvv</label>
                            <input type="password" name="cvv" className="py-input"
                                   placeholder="xxx;" size="1" minLength="3"
                                   maxLength="3" onChange={this.onChange} required/>
                        </div>
                    </div>
                    <br/>

                    <label className="py-label">Research Paper Publication Price</label><br/>
                    <input type="text" name="researchPaperPrice" value={this.state.researchPaperPrice}
                           onChange={this.onChange} size="17" disabled={true} className="py-input" required/>
                    <br/><br/>

                    <button className="btn-payment" type="submit"><i>Confirm Payment</i></button>

                </form>

            </div>

        )
    }


}
