import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import mystyles from './Modal.module.css';

const Backdrop = (props) => {
    return (
        <div className={mystyles.backdrop} onClick={props.onClose}></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div className={mystyles.modal}>
            <div className={mystyles.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;