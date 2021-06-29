import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import AddDetails from './AddDetails';
import ViewDetails from "./ViewDetails";
import decode from "jwt-decode";

class EditorDashboard extends React.Component{



    doLogout=()=>{

        localStorage.clear();
        window.location="/login"

    }

    componentDidMount() {

        if (localStorage.getItem('token')) {
            if (decode(localStorage.getItem('token')).username !== 'Editor') {
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
                        <Link to={"/editor/addDetails"}>Add Details</Link>
                        <Link to={"/editor/viewDetails"}>View Details</Link>
                        <Link to={"/editor/submissions"}>Research Submissions</Link>
                        <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/editor/addDetails"}>
                            <AddDetails />
                        </Route>
                        <Route path={"/editor/viewDetails"}>
                            <ViewDetails />
                        </Route>
                    </Switch>
                </div>
            </div>
        )
}




}

export default EditorDashboard;