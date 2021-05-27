import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/home.css';

class Header extends Component {
    state = {  }
    render() {
        return (
            <div>

                <div className="containerHeader s">
                    <img className="imgHeader" src="https://wallpaperaccess.com/full/334549.jpg" alt="Snow"/>
                    <div className="centeredHeader">LYNX CONFERENCE</div>
                </div>


                <nav className="navbar navbar-expand-lg navbar-light bg-info">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
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
                                    <Link className="dropdown-item" to="/research">Research Paper Presentation</Link>
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
                                    <Link className="dropdown-item" to="/researcher">Researcher</Link>
                                    <Link className="dropdown-item" to="/presenter">Workshop Presenter</Link>
                                    <Link className="dropdown-item" to="/attendee">Attendee</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/downloads">Download</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Header;