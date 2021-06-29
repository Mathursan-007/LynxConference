import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import React, { Component } from 'react';

function Popup(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body centered>
                <p className={'text-center'}>
                    {props.description}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;
