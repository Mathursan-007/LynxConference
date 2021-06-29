import React from 'react';
import Log from "./Log";
import axios from 'axios'
import 'react-bootstrap'

class Logs extends React.Component{



    constructor(props) {
        super(props);
        this.state={
            logs:[]
        }
    }


    componentDidMount() {

        axios.get("http://localhost:5000/admin/logs")
            .then(response=>{
                this.setState({logs:response.data})
                console.log(response.data)
            })
            .catch(error=>{
                console.log(error)
            })

    }


render() {
    return(
        <div class="table-responsive" style={{height:'80vh' ,overflow:'auto'}}>
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                </tr>
                </thead>
                <tbody>
                {this.state.logs.map(log=>{
                    return <Log log={log} key={log._id} num={this.state.logs.indexOf(log)+1}/>
                })}
                </tbody>
            </table>
        </div>
    )
}


}

export default Logs;