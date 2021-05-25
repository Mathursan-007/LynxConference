import React, { Component } from 'react';
import axios from "axios";

class AddWorkshop extends Component {
    state = {
        title: '',
        description: '',
        workshopFile: ''
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFile = (e) => {
        this.setState({workshopFile: e.target.files[0]});
        console.log(this.state.workshopFile);
    }

    handleSubmit = e => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('workshopFile', this.state.workshopFile);

        axios.post('http://localhost:5000/editor/addWorkshop/', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (

                        <form encType='multipart/form-data' onSubmit={this.handleSubmit} >
                            <div className="card border-primary rounded-0">
                                <div className="card-header p-0">
                                    <div className="bg-info text-white text-center py-2">
                                        <h3> Workshop</h3>
                                        <p className="m-0">Creating a new workshop</p>
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
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.handleInput}
                                                placeholder="Enter title of workshop"
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
                                                placeholder="Enter description about the workshop"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleInput}
                                                rows="4"
                                                cols="50"
                                                required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-file-text text-info"></i></div>
                                            </div>
                                            <input
                                                type="file"name="file"
                                                accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                                className="form-control"
                                                onChange={this.handleFile}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <input type="submit" value="Add" className="btn btn-info btn-block rounded-0 py-2" />
                                    </div>
                                </div>

                            </div>
                        </form>
        );
    }
}

export default AddWorkshop;