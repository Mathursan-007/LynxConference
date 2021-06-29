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

            <div className="table-responsive" style={{height: '80vh', overflow: 'auto'}}>
                <table className="table table-bordered">
                    <thead>
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

        )


    }


}

export default Attendees;