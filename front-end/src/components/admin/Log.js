import React from 'react'

class Log extends React.Component {

   constructor(props) {
       super(props);
   }

   render() {

       return(
               <tr>
                   <td>{this.props.num}</td>
                   <td>{this.props.log.user}</td>
                   <td>{this.props.log.action}</td>
                   <td>{this.props.log.date}</td>
                   <td>{this.props.log.time}</td>
               </tr>
       )

    }
}

export default Log;