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
            <div>
               <table>
                   <tr>
                       <thead>
                       <th>Type</th>
                       <th>Status</th>
                       </thead>
                   </tr>
                   <tbody>
                   {this.state.requests.map(request=>{
                       return <Request request={request} key={request._id} num={this.state.requests.indexOf(request)+1}/>
                   })

                   }
                   </tbody>
               </table>
            </div>
        )
    }


}

export default Requests;

