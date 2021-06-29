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
            <div>
                <div className="body s" style={{minHeight: "100vh",marginTop:"100px"}}>
                    <h2 className="text-center font-weight-bold"><u>WORK SHOP</u></h2><br/><br/>
                    <p className="text-secondary  font-weight-bold font-italic">Following is the list of workshops, which will be organized as a part of ICAF 2021.</p><br/>
                    <p className="text-black  font-weight-bold">Registration Deadline:<span style={{color:"#0b2294"}} className="font-weight-bold">11.06.2021</span></p><br/>
                    {/*<hr style={{borderTop: "1px solid black"}}/>*/}
                    <div className="container">
                        <div className="row">

                            {this.state.workshops.map(req =>

                                <React.Fragment>
                                    {req.status == 'approved' ?

                                        <div className="card imgs col-lg-6 mt-4 ml-2" style={{minHeight: "40vh",maxWidth: "90vh",backgroundColor:"#03032f"}} >

                                            <div className="card-body m-1 rounded">
                                                <img className="card-img mb-4 rounded" src={req.details.photo} alt="Card image cap" />
                                                <h5 className="card-title text-light text-center">{req.details.name}</h5>
                                                <p className="card-text text-light">{req.details.description}</p>
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
