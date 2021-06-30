import React from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import ResearchUploads from "./ResearchUploads";
//import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import WorkshopUploads from "./WorkshopUploads";
import decode from "jwt-decode";




export default class ReviewerDashboard extends React.Component {


    doLogout=()=>{

        localStorage.clear();
        window.location="/login"

    }

    componentDidMount() {


        if (localStorage.getItem('token')) {
            if (decode(localStorage.getItem('token')).username !== 'Reviewer') {
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
                    <Link to={"/reviewer/researchUploads"}><i className="fa fa-window-restore mr-2"></i>Research Papers</Link>
                    <Link to={"/reviewer/workshopUploads"}><i className="fa fa-sign-out mr-2"></i>Workshop Proposals</Link>
                    <Link to={"/login"} onClick={this.doLogout}><i className="fa fa-sign-out mr-2"></i>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/reviewer/researchUploads"}>
                            <ResearchUploads />
                        </Route>
                        <Route path={"/reviewer/workshopUploads"}>
                            <WorkshopUploads />
                        </Route>
                        <Redirect to={"/reviewer/researchUploads"}/>
                    </Switch>
                </div>
            </div>
        )
    }

}