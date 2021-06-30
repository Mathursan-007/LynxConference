import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import React, { Component } from 'react';

function PopUp(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body centered>
                <p className={'text-center text-black'}>
                    {props.description}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button  style={{backgroundColor:"#040935",width:"20%"}} onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp;
