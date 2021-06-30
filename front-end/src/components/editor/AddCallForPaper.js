import React, { Component } from 'react';
import axios from "axios";

class AddCallForPaper extends Component {

    state = {
        title: '',
        callForPaperFile: '',
        buttonState: false,
        buttonText: 'Add Call for Paper'
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = e => {

        e.preventDefault();

        const callForPaper = {
            title: this.state.title
        }

        this.setState({
            buttonState: true,
            buttonText: 'adding...'
        })


        axios.post('http://localhost:5000/editor/addCallForPaper/', callForPaper , {
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({
                    title: '',
                    buttonState: false,
                    buttonText: 'Add Call for Paper'
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
                            <h3>Call for Paper</h3>
                            <p className="m-0">Creating a call for paper</p>
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
                                    disabled={this.state.buttonState}
                                    required />
                            </div>
                        </div>

                        <div className="text-center">
                            <input
                                type="submit"
                                value={this.state.buttonText}
                                className="btn btn-info btn-block rounded-0 py-2"
                                disabled={this.state.buttonState}
                                />
                        </div>
                    </div>

                </div>
            </form>
        );
    }
}

export default AddCallForPaper;
