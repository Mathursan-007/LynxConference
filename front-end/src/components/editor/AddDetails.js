import React, { Component } from 'react';
import AddKeynoteSpeaker from './AddKeynoteSpeaker';
import AddWorkshop from './AddWorkshop';
import AddNews from './AddNews';
import AddTemplate from './AddTemplate';
import AddConference from './AddConference';
import AddCallForPaper from './AddCallForPaper';


class AddDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: 'conference'
        };
    }

    handleChange = e => {
        this.setState({detail: e.target.value});
        console.log(this.state.detail)
    }

    displayDetail = () => {
        if(this.state.detail == 'keynote') {
            return <AddKeynoteSpeaker />
        } else if(this.state.detail == 'workshop') {
            return <AddWorkshop />
        } else if(this.state.detail == 'news') {
            return <AddNews />
        } else if(this.state.detail == 'template') {
            return <AddTemplate />
        } else if(this.state.detail == 'conference') {
            return <AddConference />
        } else if(this.state.detail == 'callForPaper') {
            return <AddCallForPaper/>
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop: "70px"}}>
                <div className="row justify-content-center">
                    <div className="col-8 col-md-5 col-lg-5 pb-5">
                        <div className="card rounded-0">
                            <div className="card-header p-0">
                                <div className="text-white text-center py-2">
                                    <div className="form-group">
                                        <select className="form-control  border-info" value={this.state.detail} onChange={this.handleChange} >
                                            <option value={'conference'}>Add Conference</option>
                                            <option value={'keynote'}>Add Keynote Speaker</option>
                                            <option value={'workshop'}>Add Workshop</option>
                                            <option value={'news'}>Add News</option>
                                            <option value={'template'}>Add Templates</option>
                                            <option value={'callForPaper'}>Add Call for Paper</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-10 pb-5">

                        {this.displayDetail()}

                    </div>
                </div>
            </div>
        );
    }
}

export default AddDetails;
