import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import WorkshopUpload from './WorkshopUpload';
import '../../styles/ReviewerResearchUploads.css';
import {Button} from "react-bootstrap";

// const workshopUploads = [
//     {
//         id: 1,
//         title: 'Dive into AI',
//         category: 'Artificial Intelligence',
//         url: 'https://www.google.com/',
//         status: 'Pending'
//     },
//     {
//         id: 2,
//         title: 'Microservices in IoT Security',
//         category: 'Distributed Systems',
//         url: 'https://www.google.com/',
//         status: 'Pending'
//     },
//     {
//         id: 3,
//         title: 'AI in IoT Security',
//         category: 'Artificial Intelligence',
//         url: 'https://www.google.com/',
//         status: 'Pending'
//     }
// ]

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
            <div class="rev-table_container">
                <table class="rev-table">
                    <thead>
                    <tr class="rev-tr">
                        <th class="rev-th"></th>
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
        )
    }
}

