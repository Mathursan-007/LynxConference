import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class Downloads extends React.Component{

    state = {
        templates: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ templates: response.data.filter(request =>{
                        return request.type === 'template';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div className="body s" style={{minHeight: "100vh",marginTop:"100px"}}>
                <h2 className="text-center"><u>DOWNLOADS</u></h2><br/>
                <div className="container">
                    <div className="row">

                        {this.state.templates.map(req =>
                            <React.Fragment>
                                {req.status == 'approved' ?

                                    <div className="card col-lg-12 mt-4 text-center bg-dark p-3">
                                        <a
                                            href={`${req.details.file}`}
                                            className="text-light"
                                            download
                                        >
                                            {req.details.name}
                                        </a>
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
