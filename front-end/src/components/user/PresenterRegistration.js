import React from 'react'
 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

class PresenterRegistration extends React.Component{
    state={
        title:'',
        fullName:'',
        status:'',
        currentAffilation:'',
        jobTitle:'',
        address:'',
        email:'',
        phoneNumber:'',
        password:''

    }
    handleTitle=(e)=>{
        this.setState({title: e.target.value});
        console.log(this.state.title);
    }
    handleInput=(e)=>{
        const {name, value} = e.target;
        this.setState({[name]: value});
    }
    handleStatus=(e)=>{
        this.setState({status: e.target.value});
        console.log(this.state.title);
    }
    formSubmit=(e)=>{
        e.preventDefault();

        const presenter ={
            title:this.state.title,
            fullName: this.state.fullName,
            status: this.state.status,
            currentAffilation: this.state.currentAffilation,
            jobTitle: this.state.jobTitle,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password

        };
        axios.post('http://localhost:5000/user/addPresenter', presenter)
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

                <header className="jumbotron">
                    <h1 className="text-center display-3" id="title"> Registration Form </h1>
                    <div className="container">
                        <p id="description" className="lead">
                            <strong> Descripion: </strong> Short form asking a client/viewer simple questions. Related
                            to computer science and web development. Webpage uses bootstrap 4.3.1. Form demonstrates
                            inputs, buttons, button groups, checkboxes, dropdowns and more! </p>
                    </div>

                </header>

                <div className="container">
                    <form id="survey-form" onSubmit={this.formSubmit}>
                        <h2 className="display-5"> Basic Info </h2>
                        <div className="form-group">

                            <select className="form-control" value={this.state.title}onChange={this.handleTitle} >
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
                            <input className="form-control" type="text" name="fullName" onChange={this.handleInput} placeholder="Full name"/>
                        </div>
                        <div className="form-group">

                            <select className="form-control" value={this.state.status} onChange={this.handleStatus}>
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
                            <input className="form-control" type="text"  name="currentAffilation" onChange={this.handleInput} placeholder="Current Affilation"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="jobTitle" onChange={this.handleInput}  placeholder="Job Title"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="address" onChange={this.handleInput}  placeholder="Address"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="text" name="phoneNumber" onChange={this.handleInput} placeholder="Phone Number"/>
                        </div>

                        <div className="form-group d-flex">
                            <input className="form-control" type="email" name="email" onChange={this.handleInput} placeholder="Email"/>
                        </div>
                        <div className="form-group d-flex">
                            <input className="form-control" type="password" name="password" onChange={this.handleInput} placeholder="Password"/>
                        </div>
                        <div className="form-group d-flex">
                            <input className="form-control" type="password" name="currentPassword" placeholder="Confirm Password"/>
                        </div>



                        <p> <span><input name="AgreeCheckbox" id="agree" type="checkbox"
                                         value="AGREE"/></span> I agree the information entered above is correct. It might not be though. This is just for fun.
                        </p>


                        <button className="btn btn-primary mb-5" id="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
export default PresenterRegistration;