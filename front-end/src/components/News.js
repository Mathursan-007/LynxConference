import React from 'react'
import '../styles/news.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class News extends React.Component{

    state = {
        news: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ news: response.data.filter(request =>{
                        return request.type === 'news';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div className="body" style={{minHeight: "100vh"}}>
                <div className="container">
                        <div className="row">

                            {this.state.news.map(req =>

                                <React.Fragment>
                                    {req.status == 'approved' ?
                                <div className="card col-lg-4 mt-4">
                                    <div className="card-body m-1 rounded" style={{backgroundColor: "#0c0443"}}>
                                        <h5 className="card-title text-light">{req.details.name}</h5>
                                        <p className="card-text text-light">{req.details.description}</p>
                                        <p className="card-text"><small className="text-muted">{req.details.date}</small></p>
                                    </div>
                                </div>
                                        : ''}
                                </React.Fragment>
                            )}

                        </div>
                    </div>

            </div>
        )
    }


}