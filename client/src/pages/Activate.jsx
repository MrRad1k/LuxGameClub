import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTER } from '../utils/consts';


const Activate = () => {
    const [show, setShow] = useState(true);
    const navigate = useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(false);
        navigate(MAIN_ROUTER);
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header style={{ backgroundColor: "rgb(25 26 34)", borderBottom: "0px" }}>
                    <Modal.Title >Тренер подтвержден</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ backgroundColor: "rgb(25 26 34)", borderTop: "0px" }}>
                    <div className="con">
                        <a href="#/" className='aBtn' style={{width: "100px", textAlign: "center"}} type="submit" onClick={handleShow}>
                            <span className='spanBtn'>OK</span>
                            <i className='iBtn'></i>
                        </a>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Activate;