import React from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";



class AttendeeRegistration extends React.Component{
    state={
        username:'',
        email:'',
        phoneNumber:'',
        plan:'',
        price:5000

    }
    handleInput=(event)=>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleChange=(event)=>{
        this.setState({plan: event.target.value});
        if(this.state.plan=="Basic"){
            this.setState({price: 5000})
        }
        else if(this.state.plan=="Standard"){
            this.setState({price: 10000})
        }
        else{
            this.setState({price:20000})
        }
        console.log(this.state.plan);
    }
    formSubmit=(e)=>{
        e.preventDefault();
        alert("hi")
        const attendee ={
            username: this.state.username,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            plan: this.state.plan

        };






        axios.post('http://localhost:5000/user/addAttendee', attendee)
            .then(res => {
                console.log(res);
                window.location="/payment"
            })
            .catch(err => {
                console.log(err);
            });

    }
changePrice=()=>{

    console.log(this.state.price);

}
render() {

    return(
        <div>

            <section className="signup-section pt-5 pb-5">
                <div className="container">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="signup-area">
                                <div className="signup-element">
                                    <img src="https://i.ibb.co/bRJVsq5/contact-us-box-bg.png" alt="signup"/>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="signup-left-area">
                                            <h2 className="title">Sign Up</h2>

                                            <div className="sign-up-form-area">
                                                <form className="signup-form"   onSubmit={this.formSubmit}  >
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <input type="text" name='username' value={this.state.username} onChange={this.handleInput} placeholder="Your name"required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <input type="email" name="email" value={this.state.email} onChange={this.handleInput}  placeholder="Your Email" required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <input type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput}  placeholder="Your Phone Number" required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <input placeholder="Choose Your Plan" disabled/>

                                                            <select value={this.state.plan} className="input" onChange={this.handleChange}  >
                                                                <option value="Basic">Basic</option>
                                                                <option value="Standard">Standard</option>
                                                                <option value= "Premium">Premium</option>

                                                            </select>
                                                        </div>



                                                        <div className="col-lg-12 form-group">


                                                                     <button type="submit"> Next {this.state.price}</button>


                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div>





    )
}
}
export default AttendeeRegistration;