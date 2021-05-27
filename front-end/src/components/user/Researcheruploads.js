import React from 'react'
import '../../styles/register.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";


class Researcheruploads extends React.Component{
state={
    username:'',
    email:'',
    phoneNumber:'',
    paper:''
}
handleInput=(event)=>{
    const {name, value} = event.target;
    this.setState({[name]: value});
}
    handlePaper = (e) => {
        this.setState({paper: e.target.files[0]});

    }
    formSubmit=(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append('username', this.state.username);
        formData.append('email', this.state.email);
        formData.append('phoneNumber', this.state.phoneNumber);
        formData.append('paper', this.state.paper);


        axios.post('http://localhost:5000/user/addResearcheruploads', formData)
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
                                                    <form className="signup-form"  onSubmit={this.formSubmit}  >
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
                                                                <input type="file" accept = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={this.handlePaper} name="paper" required/>
                                                            </div>


                                                            <div className="col-lg-12 form-group">
                                                                <input type="submit" className="cmn-btn"   value="Submit"/>
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
export default Researcheruploads;
