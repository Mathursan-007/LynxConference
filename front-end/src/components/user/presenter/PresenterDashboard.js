import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import UploadProposal from "./UploadProposal";

class PresenterDashBoard extends React.Component{



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

                    <Link to={"/presenter/uploadProposal"}>Proposal Submissions</Link>
                    <Link to={"/presenter/viewWorkshop"}>View Workshop</Link>

                    <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>

                <div className={"content"}>
                    <Switch>
                        <Route path={"/presenter/uploadProposal"}>
                            <UploadProposal/>
                        </Route>
                        <Route path={"/presenter/viewWorkshop"}>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default PresenterDashBoard;