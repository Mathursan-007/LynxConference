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
            <div>
                <div className="body" style={{minHeight: "100vh",marginTop:"100px"}} id="news">
                    <h2 className="text-center font-weight-bold"><u>LATEST NEWS</u></h2><br/>
                    <div className="container s">
                        <div className="row">

                            {this.state.news.map(req =>

                                <React.Fragment>
                                    {req.status == 'approved' ?
                                        <div className="card back col-sm-4 mt-3 ml-2"  style={{minHeight: "40vh",maxWidth: "60vh"}}>
                                            <div className="card-body m-1 rounded">
                                                <h5 className="card-title text-white text-center">{req.details.name}</h5>
                                                <p className="card-text text-light text-center">wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
                                                <p className="card-text"><small className="text-light">{req.details.date}</small></p>
                                            </div>
                                        </div>
                                        : ''}
                                </React.Fragment>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        )
    }


}
