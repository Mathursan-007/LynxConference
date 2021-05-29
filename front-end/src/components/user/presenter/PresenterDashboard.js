import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import UploadProposal from "./UploadProposal";

class PresenterDashBoard extends React.Component{



    doLogout=()=>{

        sessionStorage.clear();
        window.location="/"

    }

    componentDidMount() {


        //userlogincheck

    }


    render() {

        return(
            <div>
                <div className={"sidebar"}>

                    <Link to={"/user/uploadProposal"}>Proposal Submissions</Link>
                    <Link to={"/user/viewWorkshop"}>View Workshop</Link>

                    <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>

                <div className={"content"}>
                    <Switch>
                        <Route path={"/user/uploadProposal"}>
                            <UploadProposal/>
                        </Route>
                        <Route path={"/user/viewWorkshop"}>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default PresenterDashBoard;