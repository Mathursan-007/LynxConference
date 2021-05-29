import React from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import {Link} from "react-router-dom";



class AttendeeRegistration extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            fullName:'',
            email:'',
            phoneNumber:'',
            plan:'',
            price:''

        }
    }




    handleInput=(event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    handlePrice=(event)=>{

console.log(this.state.plan)
        if(event.target.value=="Basic"){
            this.setState({price: 5000})
        }
        else if(event.target.value=="Standard"){
            this.setState({price: 10000})
        }
        else if(event.target.value=="Premium"){
            this.setState({price:20000})
        }

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
                                            <h2 className="title">Book for Conference</h2>

                                            <div className="sign-up-form-area">
                                                <form className="signup-form"   onSubmit={this.formSubmit}  >
                                                    <div className="row">
                                                        <div className="col-lg-12 form-group">
                                                            <input type="text" name='fullName' value={this.state.username} onChange={this.handleInput} placeholder="Your Full Name"required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <input type="email" name="email" value={this.state.email} onChange={this.handleInput}  placeholder="Your Email" required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <input type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput}  placeholder="Your Phone Number" required/>
                                                        </div>
                                                        <div className="col-lg-12 form-group">

                                                            <select name="plan" className="input" onChange={this.handleInput} onInput={this.handlePrice}>
                                                                <option value={""}>Choose Your Plan</option>
                                                                <option value="Basic">Basic</option>
                                                                <option value="Standard">Standard</option>
                                                                <option value= "Premium">Premium</option>
                                                            </select>

                                                            <input type="number" name="price" value={this.state.price} onChange={this.handleInput}  placeholder="Amount" disabled={true}/>

                                                        </div>
                                                        <div className="col-lg-12 form-group">
                                                            <Link to={{pathname:"/payment",
                                                                      state:{name:this.state.fullName,email:this.state.email,phoneNo:this.state.phoneNumber,plan:this.state.plan,price:this.state.price}}}>
                                                                <button type="submit"> Next</button>
                                                            </Link>
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