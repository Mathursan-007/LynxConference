import React, { Component } from 'react';
import axios from "axios";

class AddKeynoteSpeaker extends Component {
    state = {
        name: '',
        description: '',
        photo: '',
        keynoteSpeakers: [],
        buttonState: false,
        buttonText: 'Add Keynote Speaker',
        img:  ''
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ keynoteSpeakers: response.data.filter(request =>{
                        return request.type === 'keynote';
                    })

                });

                if(this.state.keynoteSpeakers.length >= 4) {
                    this.setState({
                        buttonState: true,
                        buttonText: 'Maximum speakers reached'
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

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('photo', this.state.photo);

        this.setState({
            buttonState: true,
            buttonText: 'uploading...'
        })

        axios.post('http://localhost:5000/editor/addKeynote/', formData, {
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(res => {

                this.setState({
                    keynoteSpeakers: [...this.state.keynoteSpeakers,res.data],
                    name: '',
                    description: '',
                    photo: ''

                });

                if(this.state.keynoteSpeakers.length >= 4) {
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
                            <h3> Keynote Speaker</h3>
                            <p className="m-0">Registering a keynote speaker</p>
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
                                    placeholder="Enter name of keynote speaker"
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
                                    placeholder="Enter description about speaker"
                                    rows="4"
                                    cols="50"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleInput}
                                    disabled={this.state.buttonState}
                                    required></textarea>
                            </div>
                        </div>

                        {this.state.img === '' ? '' :
                            <React.Fragment>
                                <img src={`${this.state.img}`} alt={'no image'} style={{width: "100%",height:"50vh"}} />
                            </React.Fragment>
                        }



                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fa fa-picture-o text-info"></i></div>
                                </div>
                                <input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    name="photo"
                                    className="form-control"
                                    onChange={this.handlePhoto}
                                    disabled={this.state.buttonState}
                                    required
                                />
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

export default AddKeynoteSpeaker;
