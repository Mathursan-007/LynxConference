import React from 'react';
import axios from "axios";
import Attendee from "./Attendee";


class Attendees extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            attendees:[]
        }
    }

    componentDidMount() {


        axios.get("http://localhost:5000/admin/attendees")
            .then(response=>{
                this.setState({attendees:response.data})
                console.log(response.data)
            })
            .catch(error=>{
                console.log(error)
            })


    }



    render() {

        return(

            <div className="container" style={{marginTop: "120px"}}>
                <div className="table-responsive border-dark">
                    <table className="table table-hover table-dark  table-condensed tablebody text-center">
                        <thead style={{position:'sticky',top:0}} className={"tablehead"}>
                         <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No</th>
                            <th scope="col">Plan</th>
                         </tr>
                        </thead>
                        <tbody>
                            {this.state.attendees.map(attendee => {
                                return <Attendee attendee={attendee} key={attendee._id}
                                                num={this.state.attendees.indexOf(attendee) + 1}/>
                            })

                            }
                        </tbody>
                  </table>
              </div>
            </div>

        )


    }


}

export default Attendees;