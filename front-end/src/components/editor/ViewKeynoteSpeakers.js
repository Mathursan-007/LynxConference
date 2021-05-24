import React from 'react';

class ViewKeynoteSpeakers extends React.Component {
    state = {  }
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
                                <tr>
                                    <td><img src={require('url:../../styles/content.jpg')} className="rounded" width={80} height={80} alt="..." /> </td>
                                    <td>Frank</td>
                                    <td><span className="bg-success p-1 text-light rounded">Approved</span></td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={require('url:../../styles/content.jpg')} className="rounded" width={80} height={80} alt="..." /> </td>
                                    <td>Serrano</td>
                                    <td><span className="bg-danger p-1 text-light rounded">Rejected</span></td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src={require('url:../../styles/content.jpg')} className="rounded" width={80} height={80} alt="..." /> </td>
                                    <td>Acosta</td>
                                    <td><span className="bg-warning p-1 text-light rounded">Pending</span></td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
        );
    }
}

export default ViewKeynoteSpeakers;