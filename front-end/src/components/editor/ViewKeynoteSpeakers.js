import React from 'react';
import axios from 'axios';

class ViewKeynoteSpeakers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        };
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

                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3>Keynote Speakers</h3>
                        </div>
                    </div>
                    <div className="card-body p-3">

                        <div className="table-responsive" id="sailorTableArea">
                            <table id="sailorTable" className="table table-striped table-bordered table-condensed tablebody text-center" width="100%">

                                <thead className="tablehead">
                                <tr>
                                    <th>Photo</th>
                                    <th>Speaker Name</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>

                                    {this.state.requests.map(request =>
                                        <React.Fragment>
                                            {(request.type === 'keynote') ?
                                                <tr>
                                                    <td><img src={request.details.photo} className="rounded" width={80} height={80} alt="..." /> </td>
                                                    <td>{request.details.name}</td>
                                                    <td><span className={`${this.props.statusColor(request.status)} p-1 text-light rounded`}>{request.status}</span></td>
                                                    <td>

                                                        <button className="btn btn-primary">
                                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            : ''}
                                        </React.Fragment>

                                    )}

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
        );
    }
}

export default ViewKeynoteSpeakers;