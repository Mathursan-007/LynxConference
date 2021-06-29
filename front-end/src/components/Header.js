import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/home.css';

class Header extends Component {
    state = {  }
    render() {
        return (
            <div>




                <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: "#040935"}}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto" >
                            <li className="nav-item active">
                                <Link className="nav-link text-light" to="/">Home <span
                                    className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/news">News</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" to="#" id="navbarDropdownMenuLink"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Events
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/researchPapers">Research Paper Presentation</Link>
                                    <Link className="dropdown-item" to="/workshops">Workshops</Link>
                                    <Link className="dropdown-item" to="/keynote">Keynote</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-light" to="#" id="navbarDropdownMenuLink"
                                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Registration
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item" to="/researcherReg">Researcher</Link>
                                    <Link className="dropdown-item" to="/presenterReg">Workshop Presenter</Link>
                                    <Link className="dropdown-item" to="/attendeeReg">Attendee</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/downloads">Templates</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login">Login</Link>
                            </li>
                            <li   className="nav-link text-light font-weight-bold h4" style={{marginLeft:"650px"}}>
                                ICAF 2021
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Header;
