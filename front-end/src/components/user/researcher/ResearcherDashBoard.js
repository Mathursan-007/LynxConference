import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import '../../../styles/dashboard.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import UploadPaper from "./UploadPaper";


class ResearcherDashBoard extends React.Component{



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

                    <Link to={"/researcher/uploadPaper"}>Research paper Submissions</Link>
                    <Link to={"/researcher/viewPaper"}>View Research</Link>

                    <Link to={"/login"} onClick={this.doLogout}>Logout</Link>
                </div>

                <div className={"content"}>
                    <Switch>
                        <Route exact path={"/researcher/uploadPaper"}>
                             <UploadPaper/>
                        </Route>
                        <Route path={"/user/viewResearch"}></Route>
                    </Switch>
                </div>
            </div>
        )
    }




}

export default ResearcherDashBoard;