import React from 'react'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import UploadProposal from "./UploadProposal";
import decode from "jwt-decode";
import axios from 'axios'
import WorkshopNotifications from "./WorkshopNotifications";

class PresenterDashBoard extends React.Component{



    constructor(props) {
        super(props);

        this.state = {
            notifications: 0,
            workshopUploads: []

        }
    }


    doLogout=()=>{

        localStorage.clear();
        window.location="/login"

    }

    componentDidMount() {

        if (localStorage.getItem('token')) {
            if (decode(localStorage.getItem('token')).username.split(' ')[1] !== 'presenter') {

                window.location = "/login"

            }else{

                const email = decode(localStorage.getItem('token')).username.split(' ')[0]

                axios.get('http://localhost:5000/reviewer/uploads/notify/' + email + "/workshop")
                    .then(response => {
                        console.log("response: ", response.data);

                        this.setState( {workshopUploads: response.data});

                        const status = response.data.status;

                        if(status === "approved") {
                            this.setState( {notifications: ++this.state.notifications});
                            console.log("count: ", this.state.notifications);
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
                    <Link to={"/presenter/notifications"} className="notification">
                        <span><i className="fa fa-bell fa-2x" aria-hidden="true"></i></span>
                        <span className="count">{this.state.notifications}</span>
                    </Link>
                </div>
                <div className={"sidebar"}>
                    <Link to={"/presenter/uploadProposal"}><i className="fa fa-cloud-upload  mr-2"></i>Proposal Submissions</Link>
                    <Link to={"/presenter/notifications"}><span><i className="fa fa-bell mr-2" aria-hidden="true"></i></span>Notifications</Link>
                    <Link to={"/login"} onClick={this.doLogout}><i className="fa fa-sign-out mr-2"></i>Logout</Link>
                </div>

                <div className={"content"}>
                    <Switch>
                        <Route path={"/presenter/uploadProposal"}>
                            <UploadProposal/>
                        </Route>
                        <Route path={"/presenter/viewWorkshop"}></Route>
                        <Route path="/presenter/notifications">
                            <WorkshopNotifications workshopUploads={this.state.workshopUploads} key={this.state.workshopUploads._id}/>
                        </Route>
                        <Redirect to={"/presenter/uploadProposal"}/>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default PresenterDashBoard;