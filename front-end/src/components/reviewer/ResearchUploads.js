import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import ResearchUpload from './ResearchUpload';
import '../../styles/ReviewerResearchUploads.css';

//
// const researchUploads = [
//     {
//         id: 1,
//         title: 'AI in Face Detection',
//         category: 'Artificial Intelligence',
//         url: 'https://www.google.com/',
//         status: 'Pending',
//         details: {
//             id: '100',
//             name: 'Krishna',
//             email: 'krishna@gmail.com',
//             phoneNumber: '0784512697'
//         }
//     },
//     {
//         id: 2,
//         title: 'ML in IoT Security',
//         category: 'Machine Learning',
//         url: 'https://www.google.com/',
//         status: 'Pending',
//         details: {
//             id: '101',
//             name: 'Arjunan',
//             email: 'arjunan@gmail.com',
//             phoneNumber: '0724589412'
//         }
//     },
//     {
//         id: 3,
//         title: 'AI in IoT Security',
//         category: 'Artificial Intelligence',
//         url: 'https://www.google.com/',
//         status: 'Pending',
//         details: {
//             id: '102',
//             name: 'Hanumaan',
//             email: 'hanumaan@gmail.com',
//             phoneNumber: '0754896312'
//         }
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
                        <th class="rev-th"> </th>
                        <th class="rev-th">Email</th>
                        <th class="rev-th">Phone No.</th>
                        <th className="rev-th">Stacks</th>
                        <th class="rev-th">Status</th>
                        <th class="rev-th">View Submission</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.researchUploads.map(upload => {
                        return (
                                <ResearchUpload upload={upload} key={upload._id} num={this.state.researchUploads.indexOf(upload)+1}/>
                        );
                    })}

                    </tbody>
                </table>
            </div>
        )
    }
}