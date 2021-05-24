import React, { Component } from 'react';

class AddKeynoteSpeaker extends Component {
    state = {  }
    render() {
        return (
                            <form encType='multipart/form-data'  >
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
                                                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Enter name of keynote speaker" required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-info-circle text-info"></i></div>
                                                </div>
                                                <textarea className="form-control" placeholder="Enter description about speaker" rows="4" cols="50" required></textarea>
                                            </div>
                                        </div>

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
                                                    onChange=""
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

export default AddKeynoteSpeaker;