import {Modal,Button} from 'react-bootstrap'


import React from 'react'

class WorkShop extends React.Component {

    state={
        show:false
    }

   Modal=(show)=>{
        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.request.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

   render() {

       return (
           <div>
               <Button variant="primary" onClick={()=>this.setState({show:true})}>
                   Launch vertically centered modal
               </Button>
               {this.Modal()}
           </div>
       );

    }
}

export default WorkShop;