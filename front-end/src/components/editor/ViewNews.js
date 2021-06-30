import React from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

class ViewNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            name: '',
            description: '',
            show:false,
            request:''
        };
    }

    handleInput = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit = e => {

        e.preventDefault();

        const news = {
            name: this.state.name,
            description: this.state.description
        }

        axios.put('http://localhost:5000/editor/updateNews/'+this.state.request._id, news, {
            headers:{
                Authorization:sessionStorage.getItem("token")
            }
        })
            .then(res => {

                axios.get('http://localhost:5000/editor/requests')
                    .then(response => {
                        this.setState({ requests: response.data });

                    })
                    .catch((error) => {
                        console.log(error);
                    })

                this.setState({
                    name: '',
                    description: '',
                    show: false
                });

            })
            .catch(err => {
                console.log(err);
            });

    }

    showView = () => {
        if(this.state.request) {

            return(

                <Modal show={this.state.show} centered={true} >
                    <ModalHeader>
                        <ModalTitle>

                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody>

                        <input
                            type="text"
                            className="form-control w-100 mb-5"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInput}
                            placeholder="Enter name of keynote speaker"
                            required />

                        <textarea
                            className="form-control"
                            placeholder="Enter description about speaker"
                            rows="4"
                            cols="50"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInput}
                            required></textarea>

                        <p>{this.state.request.details.date}</p>

                    </ModalBody>
                    <Modal.Footer>
                        <Button onClick={this.handleSubmit}>Update</Button>
                        <Button className="btn-danger" onClick={()=>this.setState({show:false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )
        }

    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ requests: response.data });
                console.log(this.state.requests);

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (

                <div className="card-body p-3">

                    <div className="table-responsive" id="sailorTableArea">
                        <table id="sailorTable" className="table table-hover table-dark table-condensed tablebody text-center" width="100%">

                            <thead className="tablehead" style={{position:'sticky',top:0}}>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.requests.map(request =>
                                <React.Fragment>
                                    {(request.type === 'news') ?
                                        <tr>
                                            <td>{request.details.name}</td>
                                            <td>{request.details.date}</td>
                                            <td><span className={`${this.props.statusColor(request.status)} p-1 text-light rounded`}>{request.status}</span></td>
                                            <td>

                                                <button
                                                    className="btn btn-primary"
                                                    disabled={request.status === 'rejected' || request.status === 'pending' ? false : true}
                                                    onClick={() => this.setState({
                                                        show: true,
                                                        request:request,
                                                        name: request.details.name,
                                                        description: request.details.description
                                                    })}
                                                >
                                                    <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                                </button>
                                            </td>
                                            {this.showView()}
                                        </tr>
                                        : ''}
                                </React.Fragment>

                            )}

                            </tbody>
                        </table>
                    </div>

                </div>

        );
    }
}

export default ViewNews;
