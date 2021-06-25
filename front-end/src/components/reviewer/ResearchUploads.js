import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import ResearchUpload from './ResearchUpload';
//import '../../styles/ReviewerResearchUploads.css';
import {Button, Modal} from "react-bootstrap";
import Select from 'react-select';


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

        this.onStackSelect = this.onStackSelect.bind(this);

        this.state = {
            researchUploads: [],
            uniqueStacks: [],
            allStacks: [],
            options: [],
            //selectedStacks: [],
            selectedStack: ''
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5000/reviewer/uploads')
            .then(response => {
                this.setState({ researchUploads:  response.data.filter(upload => {
                        return upload.type == "research"
                    }) });


                let stacks = [];

                this.state.researchUploads.map(item => {

                    stacks = stacks.concat(item.stacks.split(',') );

                });

                this.setState( {allStacks: stacks});
                this.setState( {uniqueStacks: [...new Set(stacks)]});

                console.log("All Stacks", this.state.allStacks);
                console.log("Unique Stacks", this.state.uniqueStacks);

                let data = [ {
                    value: 'ALL',
                    label: 'ALL'
                }];

                this.state.uniqueStacks.map(item => {
                    let stack = {
                        value: item,
                        label: item
                    };
                    data.push(stack);
                })

                this.setState( {options: data});
                console.log('options: ', this.state.options);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    onStackSelect(e) {
        //this.setState({selectedStacks : e ? e.map(item => item.value) : []})
        this.setState( {selectedStack: (e.value)});

    }

    display() {

        console.log("choose : ", this.state.selectedStack);

        if(this.state.selectedStack == '' || this.state.selectedStack == 'ALL') {
            return (
                this.state.researchUploads.map(upload => {
                    return (
                        <ResearchUpload upload={upload} key={upload._id} num={this.state.researchUploads.indexOf(upload)+1}/>
                    );
                })
            )
        }

        else {
            return (
                this.state.researchUploads.map(upload => {
                    let stack = upload.stacks;
                    if(stack.includes(this.state.selectedStack)) {
                        return (
                            <ResearchUpload upload={upload} key={upload._id} num={this.state.researchUploads.indexOf(upload)+1}/>
                        );
                    }
                })
            )
        }


    }


    render() {
        return (

            <div class="rev-table_container">

                <label className="filterLabel">Filter By Technology Stacks</label><br/><br/>
                <Select
                    placeholder="Filter by Tech Stacks..."
                    options={this.state.options}
                    onChange={this.onStackSelect}
                    className="select"
                />
                <br/><br/>


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

                    {this.display()}

                    </tbody>
                </table>

            </div>
        )
    }
}