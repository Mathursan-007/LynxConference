import React from 'react'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import UploadPaper from "./UploadPaper";
import decode from 'jwt-decode'
import axios from "axios";
import ResearchPayment from "./ResearchPayment";
import ResearchNotifications from "./ResearchNotifications";


class ResearcherDashBoard extends React.Component{


    constructor(props) {

        super(props);

        this.state = {

            notifications: 0,
            researchUploads: []

        }
    }

    doLogout=()=>{

        localStorage.clear();
        window.location="/login"

    }

    componentDidMount() {

        if (localStorage.getItem('token')) {
            if (decode(localStorage.getItem('token')).username.split(' ')[1] !== 'researcher') {

                window.location = "/login"

            }else{

                const email = decode(localStorage.getItem('token')).username.split(' ')[0]

                axios.get('http://localhost:5000/reviewer/uploads/notify/' + email + "/research")
                    .then(response => {
                        console.log("response: ", response.data);

                        this.setState( {researchUploads: response.data});

                        const status = response.data.status;
                        const paymentStatus = response.data.details.paymentStatus;

                        if(status === "approved" && paymentStatus != "paid") {
                            this.setState( {notifications: ++this.state.notifications});
                        }
                        else if (status === "rejected") {
                            this.setState( {notifications: ++this.state.notifications});
                        }
                        else {
                            this.setState( {notifications: this.state.notifications});
                        }

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

        }else{
            window.location = "/login"
        }
    }


    render() {

        return(

            <div>

                <div className="notifications">
                    <Link to={"/researcher/notifications"} className="notification">
                        <span><i className="fa fa-bell fa-2x" aria-hidden="true"></i></span>
                        <span className="count">{this.state.notifications}</span>
                    </Link>
                </div>


                <div className={"sidebar"}>

                    <Link to={"/researcher/uploadPaper"}><i className="fa fa-cloud-upload  mr-2"></i>Paper Submissions</Link>

                    <Link to={"/researcher/notifications"} className="notification" className="notifications">
                        <span><i className="fa fa-bell mr-2" aria-hidden="true"></i></span>Notifications
                    </Link>
                    <Link to={"/login"} onClick={this.doLogout}><i className="fa fa-sign-out mr-2"></i>Logout</Link>
                </div>

                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/researcher/uploadPaper"}>
                            <UploadPaper/>
                        </Route>
                        <Route path='/researcher/payment/:email/:id'
                               render = { props => <ResearchPayment {...props} /> } >
                        </Route>
                        <Route path="/researcher/notifications">
                            <ResearchNotifications researchUploads={this.state.researchUploads} key={this.state.researchUploads._id}/>
                        </Route>
                        <Redirect to={"/researcher/uploadPaper"}/>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default ResearcherDashBoard;
