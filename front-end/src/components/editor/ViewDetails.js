import React from 'react';
import ViewKeynoteSpeakers from "./ViewKeynoteSpeakers";
import ViewNews from "./ViewNews";
import ViewWorkshops from "./ViewWorkshops";
import ViewTemplates from "./ViewTemplates";
import ViewConference from "./ViewConference";
import '../../styles/viewDetails.css';
import ViewCallForPapers from "./ViewCallForPapers";
import ChangeColour from "../../functions/ChangeColour";


class ViewDetails extends React.Component {
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
            return <ViewKeynoteSpeakers statusColor = {ChangeColour} />
        } else if(this.state.detail == 'workshop') {
            return <ViewWorkshops statusColor = {ChangeColour} />
        } else if(this.state.detail == 'news') {
            return <ViewNews statusColor = {ChangeColour} />
        } else if(this.state.detail == 'template') {
            return <ViewTemplates statusColor = {ChangeColour} />
        } else if(this.state.detail == 'conference') {
            return <ViewConference statusColor = {ChangeColour} />
        } else if(this.state.detail == 'callForPaper') {
            return <ViewCallForPapers statusColor = {ChangeColour} />
        }
    }

    statusColor = status => {
        if(status == 'pending') {
            return "bg-warning";
        } else if(status == 'rejected') {
            return "bg-danger";
        } else if(status == 'approved') {
            return "bg-success";
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
                                            <option value={'conference'}>View Conference</option>
                                            <option value={'keynote'}>View Keynote Speaker</option>
                                            <option value={'workshop'}>View Workshop</option>
                                            <option value={'news'}>View News</option>
                                            <option value={'template'}>View Templates</option>
                                            <option value={'callForPaper'}>View Call for Papers</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-12 col-lg-12 pb-5">

                        {this.displayDetail()}

                    </div>
                </div>
            </div>
        );
    }
}

export default ViewDetails;
