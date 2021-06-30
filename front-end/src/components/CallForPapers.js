import React from 'react'
import '../styles/news.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from "axios";

export default class CallForPapers extends React.Component{

    state = {
        callForPapers: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/editor/requests')
            .then(response => {
                this.setState({ callForPapers: response.data.filter(request =>{
                        return request.type === 'call for paper';
                    })
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <div className="body s" style={{minHeight: "100vh", marginTop:"100px"}}>
                <h2 className="text-center font-weight-bold "><u>CALL FOR PAPERS</u></h2><br/>

                <p className="text-center text-secondary  font-weight-bold font-italic"  >ICAF 2021 is the 1st International Conference organized by the Software Engineering Research Unit, SLIIT UNI, Sri Lanka.
                    ICAF 2021 solicits research papers describing significant & innovative research contributions to following areas of IT.
                    We invite submissions on a wide range of research topics, spanning both theoretical and systems research.</p><br/>
                <h4 className="text-black"> Submission Details</h4>
                <p className="text-dark  font-weight-bold font-italic">Electronic submission in Word format is required. Papers must be formatted in IEEE two-column; according to the IEEE standard. Papers must be in trouble-free, high-resolution Word format, formatted for A4 paper, using Type 1 or TrueType fonts. IEEE submissions are anonymous for double-blind review. Please be sure to manually remove all author and affiliation information from your submission for review, or replace it with other information, such as paper number and keywords). Submissions may have up to 6 pages. Papers exceeding the specified length and formatting requirements are subject to rejection without review. The last page of final papers may contain text other than references, but all references in the submitted paper should appear in the final version, unless superseded.
                    The final submission must include the following: title; the primary author’s full name, affiliation, phone number /URL (if available), and e-mail address; all coauthors’ full names and affiliations; text; and any figures, tables, or diagrams. Note that all papers accepted for publication must be original and must not violate the Publication Ethics and Malpractices published by IEEE.
                    The IEEE copyright block is hard-coded into the paper templates to retain proper spacing, and cannot be removed. It is not considered binding until a paper is accepted and a signed copyright form is submitted by the author.</p><br/>
                <p className="text-black  font-weight-bold">At least one of the authors must pay for a accepted paper.</p>
                <p className="text-black  font-weight-bold">Registration Deadline:<span style={{color:"#0b2294"}} className="font-weight-bold">11.06.2021</span></p>
                <p className="font-weight-bold" style={{color:"#c60303"}}>Please note that Literature Survey/Review papers will not be accepted. All papers submitted will be checked for plagiarism.</p><br/><br/>

                <h3 className="text-center font-weight-bold"><u>TOPICS</u></h3><br/>
                <div className="container">
                    <div className="row">

                        {this.state.callForPapers.map(req =>

                            <React.Fragment>
                                {req.status == 'approved' ?

                                    <div className="card col-sm-4 mt-3 ml-2"  style={{minHeight: "40vh",maxWidth: "60vh",backgroundColor: "#0c0443"}}>

                                        <div className="card-body m-1 rounded">
                                            <h5 className="card-title text-light">{req.details.name}</h5>
                                        </div>
                                    </div>

                                    : ''}
                            </React.Fragment>
                        )}

                    </div>
                </div>

            </div>
        )
    }


}
