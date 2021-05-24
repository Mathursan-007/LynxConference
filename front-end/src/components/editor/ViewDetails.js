import React from 'react';
import ViewKeynoteSpeakers from "./ViewKeynoteSpeakers";
import ViewNews from "./ViewNews";
import ViewWorkshops from "./ViewWorkshops";
import ViewTemplates from "./ViewTemplates";
import '../../styles/viewDetails.css';

class ViewDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: 'keynote'
        };
    }

    handleChange = e => {
        this.setState({detail: e.target.value});
        console.log(this.state.detail)
    }

    displayDetail = () => {
        if(this.state.detail == 'keynote') {
            return <ViewKeynoteSpeakers />
        } else if(this.state.detail == 'workshop') {
            return <ViewWorkshops />
        } else if(this.state.detail == 'news') {
            return <ViewNews />
        } else if(this.state.detail == 'template') {
            return <ViewTemplates />
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
                                            <option value={'keynote'}>View Keynote Speaker</option>
                                            <option value={'workshop'}>View Workshop</option>
                                            <option value={'news'}>View News</option>
                                            <option value={'template'}>View Templates</option>
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
