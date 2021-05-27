import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Researcheruploads from "./Researcheruploads";
import Presenteruploads from "./Presenteruploads";

class UserdashBoard extends React.Component{



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
                    <Link to={"/user/uploadPage"}>Research Submissions</Link>
                    <Link to={"/user/upload"}>Proposal Submissions</Link>
                    <Link to={"/user/viewResearch"}>View Research</Link>
                    <Link to={"/user/viewWorkshop"}>View Workshop</Link>

                    <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>
                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/user/uploadPage"}>
                             <Researcheruploads/>
                        </Route>
                        <Route path={"/user/upload"}>
                            <Presenteruploads/>
                        </Route>
                        <Route path={"/user/viewResearch"}>

                        </Route>
                        <Route path={"/user/viewWorkshop"}>

                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default UserdashBoard;