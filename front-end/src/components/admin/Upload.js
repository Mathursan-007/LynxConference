import {Modal,Button} from 'react-bootstrap'


import React from 'react'

class Upload extends React.Component {

   constructor(props) {
       super(props);
   }

   render() {

       return(
           <div>
               <tr>
                   <td>{this.props.upload._id}</td>
                   <td>{this.props.upload.type}</td>
                   <td>{this.upload.status}</td>
                   <td><button onClick={()=>this.setState({show:true})}>View</button></td>
               </tr>
           </div>
       );

    }
}

export default Upload;