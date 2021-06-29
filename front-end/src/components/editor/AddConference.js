import React, { Component } from 'react';
import axios from "axios";

class AddConference extends Component {

    state = {
        name: '',
        institute: '',
        faculty: '',
        start_date: '',
        end_date: '',
        description: '',
        conference: [],
        buttonState: false,
        buttonText: 'Add Conference',
        img:  ''
    }


    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ conference: response.data.filter(request =>{
                        return request.type === 'conference';
                    })

                });

                if(this.state.conference.length >= 1) {
                    this.setState({
                        buttonState: true,
                        buttonText: 'Maximum speakers reached'
                    })
                } else {
                    this.setState({
                        buttonState: false,
                        buttonText: 'Add Keynote Speaker'
                    })
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handlePhoto = (e) => {
        this.setState({
            photo: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])
        });
        console.log(this.state.photo);
    }

    handleSubmit = e => {

        e.preventDefault();

        const conference = {
            name: this.state.name,
            institute: this.state.institute,
            faculty: this.state.faculty,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description
        }

        this.setState({
            buttonState: true,
            buttonText: 'adding...'
        })

        console.log(conference);

        axios.post('http://localhost:5000/editor/addConference/', conference,{
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(res => {

                this.setState({
                    conference: [...this.state.conference,res.data],
                    name: '',
                    institute: '',
                    faculty: '',
                    start_date: '',
                    end_date: '',
                    description: ''

                });

                if(this.state.conference.length >= 1) {
                    this.setState({
                        buttonState: true,
                        buttonText: 'Cannot add more conference'
                    })
                } else {
                    this.setState({
                        buttonState: false,
                        buttonText: 'Add Conference'
                    })
                }

            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <form encType='multipart/form-data' onSubmit={this.handleSubmit}>
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3> Conference Details</h3>
                            <p className="m-0">Add details of the conference</p>
                        </div>
                    </div>
                    <div className="card-body p-3">

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-id-card text-info"></i></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInput}
                                    placeholder="Enter name of conference"
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-university text-info"></i></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="institute"
                                    value={this.state.institute}
                                    onChange={this.handleInput}
                                    placeholder="Enter institute of conference"
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-list text-info"></i></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="faculty"
                                    value={this.state.faculty}
                                    onChange={this.handleInput}
                                    placeholder="Enter faculty of institute"
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-calendar text-info mr-4"></i> Start date </div>
                                </div>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    value={this.state.start_date}
                                    onChange={this.handleInput}
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-calendar text-info mr-4"></i> End date </div>
                                </div>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="end_date"
                                    value={this.state.end_date}
                                    onChange={this.handleInput}
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-info-circle text-info"></i></div>
                                </div>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter description about the conference"
                                    rows="4"
                                    cols="50"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleInput}
                                    disabled={this.state.buttonState}
                                    required></textarea>
                            </div>
                        </div>


                        <div className="text-center">
                            <input
                                type="submit"
                                value={this.state.buttonText}
                                className="btn btn-info btn-block rounded-0 py-2"
                                disabled={this.state.buttonState} />
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}

export default AddConference;
