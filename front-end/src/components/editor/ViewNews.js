import React from 'react';

class ViewNews extends React.Component {
    state = {  }
    render() {
        return (
                <div className="card border-primary rounded-0">
                    <div className="card-header p-0">
                        <div className="bg-info text-white text-center py-2">
                            <h3>News</h3>
                        </div>
                    </div>
                    <div className="card-body p-3">

                        <div className="table-responsive" id="sailorTableArea">
                            <table id="sailorTable" className="table table-striped table-bordered table-condensed tablebody text-center" width="100%">

                                <thead className="tablehead">
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>News 1 </td>
                                    <td>10/4/2021</td>
                                    <td><span className="bg-success p-1 text-light rounded">Approved</span></td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>News 2 </td>
                                    <td>10/3/2021</td>
                                    <td><span className="bg-danger p-1 text-light rounded">Rejected</span></td>
                                    <td>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o text-light"></i><span style={{marginLeft:"8px"}}>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>News 3 </td>
                                    <td>10/6/2021</td>
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

export default ViewNews;