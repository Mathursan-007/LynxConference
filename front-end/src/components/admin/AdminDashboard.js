import React from 'react'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'
import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Requests from "./Requests";
import Logs from "./Logs";
import Analytics from "./Analytics";
import Attendees from "./Attendees";
import decode from 'jwt-decode'

class AdminDashboard extends React.Component{



    doLogout=()=>{

        localStorage.clear();
        window.location="/login"

    }

    componentDidMount() {

        if (localStorage.getItem('token')) {
            if (decode(localStorage.getItem('token')).username !== 'Admin') {
                window.location = "/login"
            }
        }else{
            window.location = "/login"
        }

    }




    render() {

        return(
            <div>
                <div className={"sidebar"}>
                        <Link to={"/admin/analytics"}><i className="fa fa-bar-chart mr-2"></i>Analytics</Link>
                        <Link to={"/admin/requests"}><i className="fa fa-bars mr-2"></i>Page Edit Requests</Link>
                        <Link to={"/admin/logs"}><i className="fa fa-address-book mr-2"></i>Activity Log</Link>
                        <Link to={"/admin/attendees"}><i className="fa fa-users mr-2"></i>Attendees</Link>
                        <Link to={"/login"} onClick={this.doLogout}><i className="fa fa-sign-out mr-2"></i>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/admin/analytics"}>
                            <Analytics/>
                        </Route>
                        <Route exact path={"/admin/requests"}>
                            <Requests/>
                        </Route>
                        <Route exact path={"/admin/logs"}>
                            <Logs/>
                        </Route>
                        <Route exact path={"/admin/attendees"}>
                            <Attendees/>
                        </Route>
                        <Redirect to={"/admin/analytics"}/>
                    </Switch>
                </div>
            </div>
        )
}




}

export default AdminDashboard;