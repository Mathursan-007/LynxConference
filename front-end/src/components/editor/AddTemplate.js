import React, { Component } from 'react';
import axios from "axios";

class AddTemplate extends Component {
    state = {
        title: '',
        file: '',
        buttonState: false,
        buttonText: 'Add News'
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFile = (e) => {
        this.setState({file: e.target.files[0]});
        console.log(this.state.file);
    }

    handleSubmit = e => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('file', this.state.file);

        this.setState({
            buttonState: true,
            buttonText: 'Uploading file...'
        })

        axios.post('http://localhost:5000/editor/addTemplate/', formData)
            .then(res => {
                this.setState({
                    title: '',
                    file: '',
                    buttonState: false,
                    buttonText: 'Add News'
                })
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
                            <h3>Template</h3>
                            <p className="m-0">Adding a new template</p>
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
                                    disabled={this.state.buttonState}
                                    placeholder="Enter title of the template"
                                    required />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-file text-info"></i></div>
                                </div>
                                <input
                                    type="file"
                                    name="file"
                                    accept = "application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                    className="form-control"
                                    onChange={this.handleFile}
                                    disabled={this.state.buttonState}
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <input
                                type="submit"
                                value={this.state.buttonText}
                                disabled={this.state.buttonState}
                                className="btn btn-info btn-block rounded-0 py-2" />
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}

export default AddTemplate;
