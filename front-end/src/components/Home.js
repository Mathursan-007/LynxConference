import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/home.css';




class Home extends Component {


    state = {
        institute: '',
        faculty: '',
        start_date: '',
        end_date: '',
        description: ''
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/conference')
            .then(response => {
                this.setState({

                    name: response.data.details.name,
                    institute: response.data.details.institute,
                    faculty: response.data.details.faculty,
                    start_date: response.data.details.start_date,
                    end_date: response.data.details.end_date,
                    description: response.data.details.description

                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <div>
                <div class="bg-cover text-white"  >
                    <div class="container py-5 text-center height" >
                        <div className="bee"  >
                            <h1 class="font-weight-bold">{this.state.name}</h1>
                            <p class="font-italic mb-0">{this.state.faculty}.</p>
                            <p class="font-italic mb-0">{this.state.description}</p>
                            <p class="font-italic">
                                <u>{this.state.start_date} - {this.state.end_date}</u>
                            </p>
                            <p class="font-italic">
                                <u>{this.state.institute}</u>
                            </p>
                            <Link to="/news" role="button" class="btn btn-primary px-5" style={{backgroundColor: "#040935"}}>Latest News</Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
