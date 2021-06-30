import React from 'react';
import {render} from 'react-dom';
import axios from "axios";
import ResearchUpload from './ResearchUpload';
import '../../styles/ReviewerResearchUploads.css';
import {Button, Modal} from "react-bootstrap";
import Select from 'react-select';


export default class ResearchUploads extends React.Component {

    constructor(props) {
        super(props);

        this.onStackSelect = this.onStackSelect.bind(this);

        this.state = {
            researchUploads: [],
            uniqueStacks: [],
            allStacks: [],
            options: [],
            selectedStack: ''
        };
    }

    componentDidMount() {

        axios.get('http://localhost:5000/reviewer/uploads')
            .then(response => {
                this.setState({ researchUploads:  response.data.filter(upload => {
                        return upload.type === "research"
                    }) });


                let stacks = [];

                this.state.researchUploads.map(item => {

                    stacks = stacks.concat(item.stacks.split(',') );

                });

                this.setState( {allStacks: stacks});
                this.setState( {uniqueStacks: [...new Set(stacks)]});

                // console.log("All Stacks", this.state.allStacks);
                // console.log("Unique Stacks", this.state.uniqueStacks);

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
                // console.log('options: ', this.state.options);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    onStackSelect(e) {
        this.setState( {selectedStack: (e.value)});

    }

    display() {

        //console.log("choose : ", this.state.selectedStack);

        if(this.state.selectedStack === '' || this.state.selectedStack === 'ALL') {
            return (
                this.state.researchUploads.map(upload => {
                    console.log("res: ", upload);
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

            <div class="container" style={{marginTop: "100px"}}>>

                <label className="filterLabel">Filter By Technology Stacks</label><br/><br/>
                <Select
                    placeholder="Filter by Tech Stacks..."
                    options={this.state.options}
                    onChange={this.onStackSelect}
                    className="select"

                />
                <br/><br/>


                    <div className="table-responsive border-dark">
                        <table className="table table-hover table-dark table-condensed tablebody text-center">

                            <thead style={{position:'sticky',top:0}} className={"tablehead"}>
                    <tr class="rev-tr">
                        <th class="rev-th">No </th>
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
                <br/>

            </div>
        )
    }
}
