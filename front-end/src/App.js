import React from 'react'
import AdminDashboard from './components/admin/AdminDashboard'
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
import EditorDashboard from "./components/editor/EditorDashboard";
import ReviewerDashboard from "./components/reviewer/ReviewerDashboard";


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
                    <Header/>
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
                        {/*<Route path={"/login"}>*/}
                        {/*    <Login/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/researcher"}>*/}
                        {/*    <ResearcherDashBoard/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/presenter"}>*/}
                        {/*    <PresenterDashBoard/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/admin"}>*/}
                        {/*    <AdminDashboard/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/editor"}>*/}
                        {/*    <EditorDashboard/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/reviewer"}>*/}
                        {/*    <ReviewerDashboard/>*/}
                        {/*</Route>*/}
                        {/*<Route path={"/payment"} component={Payment}/>*/}
                    </Switch>
                    <Footer/>
                </Router>

            </div>

        )
    }

}


export default App;
