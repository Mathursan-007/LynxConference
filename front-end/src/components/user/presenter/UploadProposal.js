import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import decode from 'jwt-decode'



class UploadProposal extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            name:'',
            email:'',
            phoneNumber:'',
            proposal:'',
            progress:false,
            buttonText:'Submit',
            buttonState: false,
            color:'#f7bdbd'
        }
    }

    componentDidMount() {

        const email = decode(localStorage.token).username.split(' ')[0];

        console.log(email)

        axios.get('http://localhost:5000/user/presenterUpload/'+ email)
            .then(response => {

                if(response.data.count) {
                    this.setState({
                        buttonState: true,
                        buttonText: 'Already submitted'
                    });
                }
                console.log(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleInput=(event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    handleProposal = (e) => {
        this.setState({proposal: e.target.files[0]});
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('phoneNumber', this.state.phoneNumber);
        formData.append('proposal', this.state.proposal);

        this.setState({
            progress: true
        })

        axios.post('http://localhost:5000/user/addPresenterUploads', formData,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    name:'',
                    email:'',
                    phoneNumber:'',
                    proposal:'',
                    progress:false,
                    buttonState: true,
                    buttonText: 'Already submitted'
                })
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
                                                <h2 className="title">Upload Proposal</h2>

                                                <div className="sign-up-form-area">
                                                    <form className="signup-form" encType='multipart/form-data' onSubmit={this.handleSubmit} >
                                                        <div className="row">
                                                            <div className="col-lg-12 form-group">
                                                                <input type="text" name="name" value={this.state.name} onChange={this.handleInput} placeholder="Your Full Name" required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="email" name="email" value={this.state.email} onChange={this.handleInput} placeholder="Your Email" required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput} placeholder="Your Phone Number" required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="file" name="proposal" accept={"application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"} onChange={this.handleProposal} required/>
                                                            </div>
                                                            {this.state.progress ?
                                                                <div className="container p-4">
                                                                    <ProgressBar style={{height: "4vh"}} animated now={100} variant={'primary'} label={'Uploading'} />
                                                                </div>
                                                                : ''

                                                            }

                                                            <div className="col-lg-12 form-group">
                                                                <input type="submit" className="cmn-btn" value={this.state.buttonText}
                                                                       disabled={this.state.buttonState}
                                                                       style={{backgroundColor:this.state.buttonState ? this.state.color :'red'}}/>
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
export default UploadProposal;
