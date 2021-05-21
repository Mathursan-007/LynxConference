import React from 'react'
import Dashboard from './components/admin/Dashboard'
import Requests from './components/admin/Requests'
import {BrowserRouter as Router, Switch,Route,Redirect} from "react-router-dom";


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
                        <Route path={"/admin"}>
                            <Dashboard/>
                        </Route>
                        <Redirect to={"/admin"}/>
                    </Switch>
                </Router>
            </div>

        )
    }

}


export default App;
