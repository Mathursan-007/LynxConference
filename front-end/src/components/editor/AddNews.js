import React, { Component } from 'react';
import axios from "axios";

class AddNews extends Component {
    state = {
        title: '',
        description: '',
        buttonState: false,
        buttonText: 'Add News'
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = e => {

        e.preventDefault();

        const news = {
            title: this.state.title,
            description: this.state.description
        }

        this.setState({
            buttonState: true,
            buttonText: 'Adding news...'
        })

        axios.post('http://localhost:5000/editor/addNews/', news)
            .then(res => {
                this.setState({
                    title: '',
                    description: '',
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
            <form encType='multipart/form-data' onSubmit={this.handleSubmit} >
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3>News</h3>
                            <p className="m-0">Adding a latest news</p>
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
                                    placeholder="Enter title of news"
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
                                    placeholder="Enter news details"
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

export default AddNews;