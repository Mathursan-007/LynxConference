import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import ResearchUploads from "./ResearchUploads";
import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import WorkshopUploads from "./WorkshopUploads";


export default class Dashboard extends React.Component {

    doLogout=()=>{

        sessionStorage.clear();
        window.location="/login"

    }

    componentDidMount() {


        //userlogincheck

    }


    render() {

        return(
            <div>
                <div className={"sidebar"}>
                    <Link to={"/reviewer/researchUploads"}>Research Papers</Link>
                    <Link to={"/reviewer/workshopUploads"}>Workshop Proposals</Link>
                    <Link to={"/reviewer/submissions"}>My Profile</Link>
                    <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/reviewer/researchUploads"}>
                            <ResearchUploads />
                        </Route>
                        <Route path={"/reviewer/workshopUploads"}>
                            <WorkshopUploads />
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div>
    //             <h1>Reviewer Dashboard</h1>
    //         </div>
    //     );
    // }
}