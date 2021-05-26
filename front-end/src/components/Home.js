import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../styles/home.css';

class Home extends Component {
    state = {  }
    render() {
        return (
                <div class="bg-cover bg-dark text-white">
                    <div class="container py-5 text-center height">
                        <div className="bee">
                            <h1 class="font-weight-bold">LYNX Conference 2021</h1>
                            <p class="font-italic mb-0">Moratuwa Engineering Research Conference.</p>
                            <p class="font-italic mb-0">7th International Multidisciplinary Engineering Research Conference</p>
                            <p class="font-italic">
                                <u>Virtual Conference</u>
                            </p>
                            <p class="font-italic">
                                <u>Sri Lankan Institute of Sri Lanka</u>
                            </p>
                            <a href="#" role="button" class="btn btn-primary px-5">Latest News</a>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Home;