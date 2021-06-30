import React from 'react';
import axios from "axios";
import {Button, Modal, ModalBody, ModalTitle} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

class ViewConference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            name: '',
            institute: '',
            faculty: '',
            start_date: '',
            end_date: '',
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

        const conference = {
            name: this.state.name,
            institute: this.state.institute,
            faculty: this.state.faculty,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            description: this.state.description
        }

        axios.put('http://localhost:5000/editor/updateConference/'+this.state.request._id, conference, {
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

                        <input
                            type="text"
                            className="form-control w-100 mb-5"
                            name="institute"
                            value={this.state.institute}
                            onChange={this.handleInput}
                            placeholder="Enter name of keynote speaker"
                            required />

                        <input
                            type="text"
                            className="form-control w-100 mb-5"
                            name="faculty"
                            value={this.state.faculty}
                            onChange={this.handleInput}
                            placeholder="Enter name of keynote speaker"
                            required />

                        <input
                            type="date"
                            className="form-control w-100 mb-5"
                            name="start_date"
                            value={this.state.start_date}
                            onChange={this.handleInput}
                            placeholder="Enter name of keynote speaker"
                            required />

                        <input
                            type="date"
                            className="form-control w-100 mb-5"
                            name="end_date"
                            value={this.state.end_date}
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
                    <div className="table-responsive table-border-dark" >
                        <table  className="table table-hover table-dark table-condensed tablebody text-center" width="100%">
                            <thead className="tablehead" style={{position:'sticky',top:0}}>
                            <tr>
                                <th>Title</th>
                                <th>Institute</th>
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.requests.map(request =>
                                <React.Fragment>
                                    {(request.type === 'conference') ?
                                        <tr>
                                            <td>{request.details.name}</td>
                                            <td>{request.details.institute}</td>
                                            <td><span className={`${this.props.statusColor(request.status)} p-1 text-light rounded`}>{request.status}</span></td>
                                            <td>

                                                <button
                                                    className="btn btn-primary"
                                                    disabled={request.status === 'rejected' || request.status === 'pending' ? false : true}
                                                    onClick={() => this.setState({
                                                        show: true,
                                                        request:request,
                                                        name: request.details.name,
                                                        institute: request.details.institute,
                                                        faculty: request.details.faculty,
                                                        start_date: request.details.start_date,
                                                        end_date: request.details.end_date,
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

export default ViewConference;
