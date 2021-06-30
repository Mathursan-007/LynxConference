import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import WorkshopUpload from './WorkshopUpload';
import '../../styles/ReviewerResearchUploads.css';
import {Button} from "react-bootstrap";


export default class WorkshopUploads extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            workshopUploads: [],
        };
    }


    componentDidMount() {


        axios.get('http://localhost:5000/reviewer/uploads')
            .then(response => {
                this.setState({ workshopUploads:  response.data.filter(upload => {
                        return upload.type == "workshop"
                    }) });

                console.log(this.state.workshopUploads);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <div className="container" style={{marginTop: "120px"}}>
                <div className="table-responsive border-dark">
                    <table className="table table-hover table-dark table-condensed tablebody text-center">

                        <thead style={{position:'sticky',top:0}} className={"tablehead"}>
                    <tr class="rev-tr">
                        <th class="rev-th">No</th>
                        <th class="rev-th">Email</th>
                        <th class="rev-th">Phone No.</th>
                        <th class="rev-th">Status</th>
                        <th class="rev-th">View Submission</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.workshopUploads.map(upload => {
                        return (
                            <WorkshopUpload workshopUpload={upload} key={upload._id} num={this.state.workshopUploads.indexOf(upload)+1} />
                        );
                    })}
                    </tbody>
                 </table>
                </div>
            </div>
        )
    }
}

