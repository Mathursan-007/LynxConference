import React from 'react'
import '../styles/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios'
import decode from "jwt-decode";


class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
        }
    }

    componentDidMount() {

        if(localStorage.getItem('token')) {


            if (decode(localStorage.getItem('token')).username === 'Admin') {
                window.location = "/admin"
            } else if (decode(localStorage.getItem('token')).username === 'Editor') {
                window.location = "/editor"
            } else if (decode(localStorage.getItem('token')).username === 'Reviewer') {
                window.location = "/reviewer"
            } else if (decode(localStorage.getItem('token')).username.split(' ')[1] === 'presenter') {
                window.location = "/presenter"
            } else if (decode(localStorage.getItem('token')).username.split(' ')[1] === 'researcher') {

                window.location = "/researcher"
            }

        }
    }

    handleInput=(event) =>{
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit=(event)=> {

        event.preventDefault();



        const user = {
            username: this.state.username,
            password: this.state.password
        }


        axios.post('http://localhost:5000/user/login',user)
            .then(res =>{

                console.log(res.data)

                if(res.data.user=="admin"){

                    localStorage.setItem("token",res.data.accessToken);
                    window.location="/admin"

                }else if(res.data.user =="editor"){

                    localStorage.setItem("token",res.data.accessToken);
                    window.location="/editor"

                }
                else if(res.data.user =="reviewer"){

                    localStorage.setItem("token",res.data.accessToken);
                    window.location="/reviewer"

                }else if(res.data.user=="researcher"){

                    localStorage.setItem("token",res.data.accessToken);
                    window.location="/researcher"

                }else if(res.data.user=="presenter"){

                    localStorage.setItem("token",res.data.accessToken);
                    window.location="/presenter"

                }


                this.setState({
                    username: '',
                    password: ''
                })

            })
            .catch(e=>{
                alert(e.response.data.error); //model
                this.setState({
                    username: '',
                    password: ''
                })
            })
    }





    render(){

        return (
                <div>
                    <div className="c" style={{marginTop:"100px"}}>
                        <div className="sc">
                            <div className="screen__c">
                                <form className="login" onSubmit={this.handleSubmit}>
                                    <div className="login__field">
                                        <i className="fa fa-user fa-lg"></i>
                                        <input type="text" className="login__input" name="username" value={this.state.username} onChange={this.handleInput} placeholder="User name" required/>
                                    </div>
                                    <div className="login__field">
                                        <i className="fa fa-lock fa-lg"></i>
                                        <input type="password" className="login__input" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password" required/>
                                    </div>
                                    <button className="button login__submit" type="submit" >
                                        <span className="button__text">Log In Now</span>
                                        <i className="button__icon fa fa-angle-right fa-2x"></i>
                                    </button>
                                </form>


                            </div>
                            <div className="screen__b">
                                <span className="screen__background__shape screen__background__shape4"></span>
                                <span className="screen__background__shape screen__background__shape3"></span>
                                <span className="screen__background__shape screen__background__shape2"></span>
                                <span className="screen__background__shape screen__background__shape1"></span>
                            </div>
                        </div>
                    </div>
                </div>
                );
    }
}





export default Login;
