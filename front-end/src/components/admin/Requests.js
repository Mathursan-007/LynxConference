import React from "react";
import {render} from "react-dom";
import axios from 'axios'
import Request from './Request'
import {Button, Modal, ModalBody, ModalFooter} from 'react-bootstrap'

const requests=[

    {id:1,title:"keynote",status:"pending",content:"nothing"},
    {id:2,title:"news",status:"pending",content:"something"}

]

class Requests extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            requests:[]
        }
    }


    componentDidMount() {

    //    axios.get("http://localhost:5000/admin/requests")
    //        .then(response=>{
    //            this.setState({requests:response.data})
    //            console.log(response.data)
    //        })
    //        .catch(error=>{
    //            console.log(error)
    //        })
    //
     }


    render() {
        return(
            <div>
               <table>
                   <tr>
                       <thead>
                       <th>ID</th>
                       <th>Title</th>
                       <th>Status</th>
                       </thead>
                   </tr>
                   <tbody>
                   {requests.map(request=>{
                       return <Request request={request} key={request.id}/>
                   })

                   }
                   </tbody>
               </table>
            </div>
        )
    }


}

export default Requests;

