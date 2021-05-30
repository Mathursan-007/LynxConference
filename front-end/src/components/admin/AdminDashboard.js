import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Requests from "./Requests";
import Uploads from "./Uploads";

class AdminDashboard extends React.Component{



    doLogout=()=>{

        sessionStorage.clear();
        window.location="/login"

    }

    componentDidMount() {


        if(!sessionStorage.getItem("token")){
            window.location="/login"
        }

    }


    render() {

        return(
            <div>
                <div className={"sidebar"}>
                        <Link to={"/admin/requests"}>Publish Requests</Link>
                        <Link to={"/admin/uploads"}>Uploads</Link>
                        <Link to={"/admin/submissions"}>Research Submissions</Link>
                        <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/admin/requests"}>
                            <Requests/>
                        </Route>
                        <Route exact path={"/admin/uploads"}>
                            <Uploads/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
}




}

export default AdminDashboard;