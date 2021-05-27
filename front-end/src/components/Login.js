import React from 'react'
import '../styles/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


class Login extends React.Component{

state={
    username:'',
    password:''
}
handleInput=(event) =>{
    let n=event.target.name;

    if(n == 'username'){
        this.setState({username: event.target.value})

    }
    else{
        this.setState({password: event.target.value})
    }
    console.log(this.state.username);
    console.log(this.state.password);

}
formSubmit= () =>{

}
render(){
        return (
            <div>
                <div className="c">
                    <div className="s">
                        <div className="screen__c">
                            <form className="login" onSubmit={this.formSubmit}>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input type="text" className="login__input" name="username" onChange={this.handleInput} placeholder="User name" required/>
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input type="password" className="login__input" name="password" onChange={this.handleInput} placeholder="Password" required/>
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
