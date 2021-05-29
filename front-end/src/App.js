import React from 'react'
import Dashboard from './components/admin/Dashboard'
import Requests from './components/admin/Requests'
import {BrowserRouter as Router, Switch,Route,Redirect} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import News from "./components/News";
import KeynoteSpeakers from "./components/KeynoteSpeakers";
import ListWorkShops from "./components/ListWorkshops"
import Downloads from "./components/Downloads";
import ResearcherRegistration from "./components/ResearcherRegistration";
import AttendeeRegistration from "./components/AttendeeRegistration";
import PresenterRegistration from "./components/PresenterRegistration";
import Payment from "./components/Payment";
import ResearcherDashBoard from "./components/user/researcher/ResearcherDashBoard";
import PresenterDashBoard from "./components/user/presenter/PresenterDashboard";


class App extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            user:""
        }

    }

    render() {
        return (
            <div>
                <Router>

                    <Switch>
                        <Route exact path={"/"}>
                            <Home/>
                        </Route>
                        <Route path={"/news"}>
                            <News/>
                        </Route>
                        <Route path={"/keynote"}>
                            <KeynoteSpeakers/>
                        </Route>
                        <Route path={"/workshops"}>
                            <ListWorkShops/>
                        </Route>
                        <Route path={"/researcherReg"}>
                            <ResearcherRegistration/>
                        </Route>
                        <Route path={"/presenterReg"}>
                            <PresenterRegistration/>
                        </Route>
                        <Route path={"/attendeeReg"}>
                            <AttendeeRegistration/>
                        </Route>
                        <Route path={"/downloads"}>
                            <Downloads/>
                        </Route>
                        <Route path={"/login"}>
                            <Login/>
                        </Route>
                        <Route path={"/researcher"}>
                            <ResearcherDashBoard/>
                        </Route>
                        <Route path={"/presenter"}>
                            <PresenterDashBoard/>
                        </Route>
                        <Route path={"/payment"} component={Payment}/>
                    </Switch>
                </Router>

            </div>

        )
    }

}


export default App;
