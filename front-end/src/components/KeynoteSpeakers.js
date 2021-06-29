import React from 'react'
import '../styles/keyspeakers.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class KeynoteSpeakers extends React.Component{

    state = {
        keynoteSpeakers: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ keynoteSpeakers: response.data.filter(request =>{
                        return request.type === 'keynote';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(

            <div style={{marginTop:"100px"}}>
                <h2 className="text-center font-weight-bold"><u>KEYNOTE SPEAKERS</u></h2><br/>

                <div className='cont bg-light'>
                    <div style={{marginBottom:"30px"}}>

                    </div>
                    {this.state.keynoteSpeakers.map((req,id) =>
                        <React.Fragment>
                            {req.status == 'approved' ?
                                <input
                                    type="radio"
                                    name="r"
                                    id={`r${id+1}`}
                                    checked={(id+1) == 1 ? 'true' : 'false'}
                                />
                                : ''}
                        </React.Fragment>
                    )}

                    <div className='Slider'>

                        {this.state.keynoteSpeakers.map(req =>
                            <React.Fragment>
                                {req.status == 'approved' ?
                                    <div className='slide One'>
                                        <div className='Content'>
                                            <div>
                                                <h2>{req.details.name}</h2>
                                                <p>{req.details.description}</p>
                                                <a href="#">Learn More</a>
                                            </div>
                                        </div>
                                        <div className="ImageContent">
                                            <img
                                                src={req.details.photo} />
                                        </div>
                                    </div>
                                    : ''}
                            </React.Fragment>
                        )}

                    </div>

                    <div className="Navigation">
                        {this.state.keynoteSpeakers.map((req,id) =>
                            <React.Fragment>
                                {req.status == 'approved' ?
                                    <label htmlFor={`r${id+1}`}><span></span></label>
                                    : ''}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>





        )
    }


}
