import React from 'react'
import '../styles/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios'


class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
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

        console.log(user)

        axios.post('http://localhost:5000/user/login',user)
            .then(res =>{

                console.log(res.data)

                if(res.data.user=="admin"){

                    sessionStorage.setItem("token",res.data.accessToken);
                    window.location="/admin"

                }else if(res.data.user =="editor"){

                    sessionStorage.setItem("token",res.data.accessToken);
                    window.location="/editor"

                }
                else if(res.data.user =="reviewer"){

                    sessionStorage.setItem("token",res.data.accessToken);
                    window.location="/reviewer"

                }else if(res.data.user=="researcher"){

                    sessionStorage.setItem("token",res.data.accessToken);
                    window.location="/researcher"

                }else if(res.data.user=="presenter"){

                    sessionStorage.setItem("token",res.data.accessToken);
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
                <div className="c">
                    <div className="s">
                        <div className="screen__c">
                            <form className="login" onSubmit={this.handleSubmit}>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input type="text" className="login__input" name="username" value={this.state.username} onChange={this.handleInput} placeholder="User name" required/>
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input type="password" className="login__input" name="password" value={this.state.password} onChange={this.handleInput} placeholder="Password" required/>
                                </div>
                                <button className="button login__submit" type="submit" >
                                    <span className="button__text">Log In Now</span>
                                    <i className="button__icon fas fa-chevron-right"></i>
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
