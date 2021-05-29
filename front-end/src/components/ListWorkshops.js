import React from 'react'
import '../styles/news.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class ListWorkshops extends React.Component{

    state = {
        workshops: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ workshops: response.data.filter(request =>{
                        return request.type === 'workshop';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div className="body s" style={{minHeight: "100vh"}}>
                <div className="container">
                    <div className="row">

                        {this.state.workshops.map(req =>

                            <React.Fragment>
                                {req.status == 'approved' ?

                            <div className="card col-lg-4 mt-4">

                                <div className="card-body m-1 rounded" style={{backgroundColor: "#0c0443"}}>
                                    <img className="card-img mb-4 rounded" src={req.details.photo} alt="Card image cap" />
                                    <h5 className="card-title text-light">{req.details.name}</h5>
                                    <p className="card-text text-light">{req.details.description}</p>
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