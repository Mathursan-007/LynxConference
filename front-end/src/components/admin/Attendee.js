import React from 'react'

class Attendee extends React.Component {

   constructor(props) {
       super(props);

   }

   render() {

       return(
               <tr>
                   <td>{this.props.num}</td>
                   <td>{this.props.attendee.fullName}</td>
                   <td>{this.props.attendee.email}</td>
                   <td>{this.props.attendee.phoneNumber}</td>
                   <td>{this.props.attendee.plan}</td>
               </tr>
       );

    }
}

export default Attendee;