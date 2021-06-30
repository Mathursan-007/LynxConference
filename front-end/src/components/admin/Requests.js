import React from "react";
import {render} from "react-dom";
import axios from 'axios'
import Request from './Request'
import 'react-bootstrap'



class Requests extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            requests:[]
        }
    }


    componentDidMount() {



       axios.get("http://localhost:5000/admin/requests")
           .then(response=>{
               this.setState({requests:response.data})
               console.log(response.data)
           })
           .catch(error=>{
               console.log(error)
           })

     }


    render() {
        return(
            <div className="container" style={{marginTop: "120px"}}>
                <div className="table-responsive">
                   <table className="table table-hover table-dark table-condensed tablebody text-center">
                       <thead style={{position:'sticky',top:0}} className={"tablehead"}>
                       <tr >
                           <th scope="col">No</th>
                           <th scope="col">Type</th>
                           <th scope="col">Status</th>
                           <th scope="col">Action</th>
                       </tr>
                       </thead>
                       <tbody>
                       {this.state.requests.map(request=>{
                           return <Request request={request} key={request._id} num={this.state.requests.indexOf(request)+1}/>
                       })

                       }
                       </tbody>
                   </table>
                </div>
            </div>
        )
    }


}

export default Requests;

//style={{height:'80vh',overflow:'auto'}}