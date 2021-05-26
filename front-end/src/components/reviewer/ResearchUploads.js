import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import ResearchUpload from './ResearchUpload';
import '../../styles/ReviewerResearchUploads.css';


// const researchUploads = [
//     {
//         id: 1,
//         title: 'AI in Face Detection',
//         category: 'Artificial Intelligence',
//         url: 'https://www.google.com/',
//         status: 'Pending'
//     },
//     {
//         id: 2,
//         title: 'ML in IoT Security',
//         category: 'Machine Learning',
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

export default class ResearchUploads extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            researchUploads: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/reviewer/uploads')
            .then(response => {
                this.setState({ researchUploads:  response.data.filter(upload => {
                        return upload.type == "research"
                    }) });

                console.log(this.state.researchUploads);

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
                        <th class="rev-th">ID</th>
                        <th class="rev-th">Title</th>
                        <th class="rev-th">Category</th>
                        <th class="rev-th">Status</th>
                        <th class="rev-th">View Submission</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.researchUploads.map(upload => {
                        return (
                                <ResearchUpload upload={upload} key={upload._id} />
                        );
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}