import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch,Redirect} from 'react-router-dom'
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
                    <Link to={"/editor/addDetails"}><i className="fa fa-plus  mr-2"></i>Add Details</Link>
                    <Link to={"/editor/viewDetails"}><i className="fa fa-eye  mr-2"></i>View Details</Link>

                    <Link to={"/login"} onClick={this.doLogout}><i className="fa fa-sign-out mr-2"></i>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/editor/addDetails"}>
                            <AddDetails />
                        </Route>
                        <Route path={"/editor/viewDetails"}>
                            <ViewDetails />
                        </Route>
                        <Redirect to={"/editor/addDetails"}/>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default EditorDashboard;
