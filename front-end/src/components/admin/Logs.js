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
        <div className="container" style={{marginTop: "120px"}}>
            <div className="table-responsive border-dark">
                <table className="table table-hover table-dark table-condensed tablebody text-center">

                    <thead style={{position:'sticky',top:0}} className={"tablehead"}>
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
        </div>
    )
}


}

export default Logs;