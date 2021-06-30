import React from 'react'
//import '../styles/registration.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import {Link} from "react-router-dom";
import Popup from "./PopUp"

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
            id:'',
            errorMessage:false,
            popMessage:''

        }
    }


    handleInput = event => {
        this.setState({[event.target.name]:event.target.value});
    }



    handleSubmit=(e)=>{
        e.preventDefault();

        if(this.state.password===this.state.confirmPassword) {


            const researcher = {
                title: this.state.title,
                fullName: this.state.fullName,
                nic: this.state.nic,
                passportNo: this.state.passportNo,
                status: this.state.status,
                currentAffiliation: this.state.currentAffiliation,
                jobTitle: this.state.jobTitle,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                password: this.state.password,
                type: "researcher"

            };


            axios.post('http://localhost:5000/user/addUser', researcher)
                .then(res => {
                    this.setState({errorMessage:true,popMessage:'Successfully registered Welcome to ICAF'})
                    console.log(res);
                    this.setState({
                        title: '',
                        fullName: '',
                        nic: '',
                        passport: '',
                        status: '',
                        currentAffiliation: '',
                        jobTitle: '',
                        address: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                        agree: false
                    })

                    localStorage.setItem("token", res.data);
                    window.location = "/researcher"

                })
                .catch(e => {
                    this.setState({errorMessage:true,popMessage:e.response.data.error})
                });
        }else{
            this.setState({errorMessage:true,popMessage:'Password and Confirm Password did not match '})
        }





    }



    selectId=()=>{
        if(this.state.id=="nic"){
            return(
                <div className="form-group d-flex">
                    <input className="form-control" type="text" name="nic" pattern="(([0-9]{9}[V]{1})|([0-9]{12}))" value={this.state.nic} onChange={this.handleInput} placeholder="NIC No"/>
                </div>
            )
        }else if(this.state.id=="passport"){
            return (
                <div className="form-group d-flex">
                    <input className="form-control" type="text" pattern="[A-Z]{1}[0-9]{7}" name="passportNo" value={this.state.passportNo} onChange={this.handleInput} placeholder="Passport No"/>
                </div>
            )
        }
    }



    render() {

        return(
            <div>
                <div className="container" style={{marginTop:"100px"}}>
                    <header className="jumbotron" style={{backgroundColor:" #af1400"}}>
                        <h1 className="text-center display-3" id="title" style={{color:"#fff"}}>Researcher Registration </h1>
                    </header>

                    <div className="container">
                        <form id="survey-form" onSubmit={this.handleSubmit}>
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
                            </div><br/>
                            <div className="form-group d-flex">
                                <input className="form-control" type="text" name="fullName" value={this.state.fullName} onChange={this.handleInput} placeholder="Full name"/>
                            </div><br/>
                            <div className="ml-4">
                                <input className="form-check-input " type="radio" name="id" value="nic" onChange={this.handleInput}/><label className="form-check-label">NIC</label><br/>
                                <input className="form-check-input " type="radio" name="id" value="passport" onChange={this.handleInput}/><label className="form-check-label">Passport</label>
                            </div><br/>

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
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="text"  name="currentAffiliation" value={this.state.currentAffiliation} onChange={this.handleInput} placeholder="Current Affiliation"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="text" name="jobTitle" value={this.state.jobTitle} onChange={this.handleInput}  placeholder="Job Title"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInput}  placeholder="Address"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control"  type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput} placeholder="Phone Number"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Email"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="password"  title="Only letters (either case), numbers, and the underscore; no more than 15 characters." pattern="[A-Za-z0-9_]{1,15}" minLength="8" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
                            </div><br/>

                            <div className="form-group d-flex">
                                <input className="form-control" type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInput} placeholder="Confirm Password"/>
                            </div><br/>


                            <input name="AgreeCheckbox" id="agree" type="checkbox" value="AGREE"
                                   onClick={() => this.state.agree ?
                                       this.setState({agree: false}) : this.setState({agree: true})}
                            />
                            <label className="ml-2">I agree the information entered above is correct.

                            </label><br/><br/>
                            <button style={{width:"100%"}} className="btn btn-danger mb-5" id="submit" disabled={!this.state.agree} >Submit</button>
                        </form>
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
export default ResearcherRegistration
