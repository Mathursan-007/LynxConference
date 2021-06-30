import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";
import decode from 'jwt-decode';


class UploadPaper extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            name: '',
            email: '',
            phoneNumber: '',
            paper: '',
            stacks:[],
            progress:false,
            buttonText:'Submit',
            buttonState: false,
            color:'#f7bdbd'

        }
    }
    componentDidMount() {

        const email = decode(localStorage.token).username.split(' ')[0];

        console.log(email)

        axios.get('http://localhost:5000/user/researcherUpload/'+ email)
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

    handlePaper = (e) => {
        this.setState({paper: e.target.files[0]});
    }

    handleSubmit=(e)=> {

        e.preventDefault();

        if (this.state.stacks.length != 0) {

            const formData = new FormData();

            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('phoneNumber', this.state.phoneNumber);
            formData.append('paper', this.state.paper);
            formData.append('stacks', this.state.stacks);

            this.setState({
                progress: true
            })

            axios.post('http://localhost:5000/user/addResearcherUploads', formData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(res => {
                    console.log(res);
                    this.setState({
                        name: '',
                        email: '',
                        phoneNumber: '',
                        paper: '',
                        stacks: [],
                        progress: false,
                        buttonState: true,
                        buttonText: 'Already submitted'
                    })
                })
                .catch(err => {
                    console.log(err);
                });

        }else{
            alert('select stacks')
        }
    }

    addStack=(e)=>{


        let stacks =[...this.state.stacks,e.target.value]

        if(this.state.stacks.includes(e.target.value)){
            stacks = stacks.filter(stack=>{
                return stack!==e.target.value
            })
        }

        this.setState({stacks:stacks})

    }

    render() {
        return(

            <div>
                <section className="signup-section pt-5 pb-5">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="signup-area">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="signup-left-area">
                                                <h2 className="title">Upload Paper</h2>

                                                <div className="sign-up-form-area">
                                                    <form className="signup-form"  onSubmit={this.handleSubmit}  >
                                                        <div className="row">
                                                            <div className="col-sm-12 form-group">
                                                                <input type="text" name='name' value={this.state.name} onChange={this.handleInput} placeholder="Your name"required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="email" name="email" value={this.state.email} onChange={this.handleInput}  placeholder="Your Email" required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInput}  placeholder="Your Phone Number" required/>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                Stacks Used:<br></br>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Java" onInput={this.addStack} />Java</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Python" onInput={this.addStack}/>Python</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="C++" onInput={this.addStack}/>C++</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="C#"onInput={this.addStack}/>C#</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="NodeJs" onInput={this.addStack}/>NodeJS</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Ruby"onInput={this.addStack}/>Ruby</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Swift" onInput={this.addStack}/>Swift</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Go" onInput={this.addStack}/>Go</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="PHP" onInput={this.addStack}/>PHP</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Spring" onInput={this.addStack}/>Spring</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Django" onInput={this.addStack}/>Django</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="JQuery" onInput={this.addStack}/>JQuery</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Laravel"onInput={this.addStack}/>Laravel</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="ReactJS"onInput={this.addStack}/>ReactJS</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="AngularJS"onInput={this.addStack}/>AngularJS</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="VueJS" onInput={this.addStack}/>VueJS</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="React Native" onInput={this.addStack}/>React Native</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Ionic" onInput={this.addStack}/>Ionic</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Swing" onInput={this.addStack}/>Swing</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="ElectronJS" onInput={this.addStack}/>ElectronJs</label></div>
                                                                <div className="form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" value="Other" onInput={this.addStack}/>Other</label></div>
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input type="file" accept = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation" onChange={this.handlePaper} name="paper" required/>
                                                            </div>
                                                            {this.state.progress ?
                                                                <div className="container p-4">
                                                                    <ProgressBar style={{height: "4vh"}} animated now={100} variant={'primary'} label={'Uploading'} />
                                                                </div>
                                                                : ''

                                                            }
                                                            <div className="col-lg-12 form-group">
                                                                <input
                                                                    type="submit"
                                                                    className="cmn-btn"
                                                                    value={this.state.buttonText}
                                                                    disabled={this.state.buttonState}
                                                                    style={{backgroundColor:this.state.buttonState ? this.state.color :'red'}}
                                                                />
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
export default UploadPaper;
