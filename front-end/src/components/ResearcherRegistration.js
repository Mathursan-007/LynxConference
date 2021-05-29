import React from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import {Link} from "react-router-dom";

class ResearcherRegistration extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            title:'',
            fullName:'',
            nic:'',
            passportNo:'',
            status:'',
            currentAffiliation:'',
            jobTitle:'',
            address:'',
            email:'',
            phoneNumber:'',
            password:'',
            confirmPassword:'',
            agree:false,
            id:''

        }
    }


         handleInput = event => {
            this.setState({[event.target.name]:event.target.value});
          }



        handleSubmit=(e)=>{
            e.preventDefault();

            if(this.state.password===this.state.confirmPassword){


                const researcher ={
                    title:this.state.title,
                    fullName: this.state.fullName,
                    nic:this.state.nic,
                    passportNo:this.state.passportNo,
                    status: this.state.status,
                    currentAffiliation: this.state.currentAffiliation,
                    jobTitle: this.state.jobTitle,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    password: this.state.password,
                    type:"researcher"

                };


                axios.post('http://localhost:5000/user/addUser', researcher)
                    .then(res => {
                        alert("success")
                        console.log(res);
                        this.setState({
                            title:'',
                            fullName:'',
                            nic:'',
                            passport:'',
                            status:'',
                            currentAffiliation:'',
                            jobTitle:'',
                            address:'',
                            email:'',
                            phoneNumber:'',
                            password:'',
                            confirmPassword:'',
                            agree:false
                        })
                        sessionStorage.setItem("token",res.data);
                        window.location = "/"
                    })
                    .catch(e => {
                        alert(e.response.data.error)
                    });


            }


       }



    selectId=()=>{
        if(this.state.id=="nic"){
            return(
                <div className="form-group d-flex">
                    <input className="form-control" type="text" name="nic" value={this.state.nic} onChange={this.handleInput} placeholder="NIC No"/>
                </div>
            )
        }else if(this.state.id=="passport"){
            return (
                <div className="form-group d-flex">
                    <input className="form-control" type="text" name="passportNo" value={this.state.passportNo} onChange={this.handleInput} placeholder="Passport No"/>
                </div>
            )
        }
    }



    render() {

        return(
            <div>

                <header className="jumbotron">
                    <h1 className="text-center display-3" id="title"> Registration Form </h1>
                </header>

                <div className="container">
                    <form id="survey-form" onSubmit={this.handleSubmit}>
                        <h2 className="display-5"> Basic Info </h2>
                        <div className="form-group">

                            <select className="form-control" name="title" value={this.state.title} onChange={this.handleInput} >
                                <option value="">Title</option>
                                <option value="Dr">Dr</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                                <option value="Prof">Prof</option>
                                <option value="Mx">Mx</option>

                            </select>
                        </div>
                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="fullName" value={this.state.fullName} onChange={this.handleInput} placeholder="Full name"/>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">NIC:<input className="form-check-input" type="radio" name="id" value="nic" onChange={this.handleInput}/></label>
                            <label className="form-check-label">Passport:<input className="form-check-input" type="radio" name="id" value="passport" onChange={this.handleInput}/></label>
                        </div>

                        {this.selectId()}

                        <div className="form-group">
                            <select className="form-control" name="status" value={this.state.status} onChange={this.handleInput}>
                                <option value=""> Status</option>
                                <option value="Student">Student</option>
                                <option value="Academic">Academic</option>
                                <option value="Industry">Industry</option>
                                <option value="Government">Government</option>
                                <option value="Retired">Retired</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text"  name="currentAffiliation" value={this.state.currentAffiliation} onChange={this.handleInput} placeholder="Current Affiliation"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="jobTitle" value={this.state.jobTitle} onChange={this.handleInput}  placeholder="Job Title"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInput}  placeholder="Address"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput} placeholder="Phone Number"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInput} placeholder="Confirm Password"/>
                        </div>


                        <p> <span><input name="AgreeCheckbox" id="agree" type="checkbox" value="AGREE"
                                         onClick={()=>this.state.agree?
                                          this.setState({agree:false}):this.setState({agree:true})}
                                         />
                            </span>I agree the information entered above is correct. It might not be though. This is just for fun.

                        </p>
                        <button className="btn btn-primary mb-5" id="submit" disabled={!this.state.agree} >Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default ResearcherRegistration