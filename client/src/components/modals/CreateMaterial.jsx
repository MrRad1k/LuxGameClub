import React from 'react';
import { useState } from 'react';
import { createMaterial, createStatistic, fetchMaterials } from '../../http/trainerAPI';
import { Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const CreateMaterial = ({ show, onHide }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const { id } = useParams()
    const [materials, setMaterials] = useState([])

    const addMaterial = async () => {
        if (text !== '' && title !== '')
            await createMaterial({ title: title, text: text, trainerId: id }).then(data => {
                setTitle('')
                setText('')
                onHide()
                window.location.reload();
            })
    }


    return (
        <Modal size="lg" show={show} onHide={onHide} >
            <Modal.Header closeButton style={{ backgroundColor: "rgb(25 26 34)" }}>
                <Modal.Title>Добавить материал</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "rgb(25 26 34)" }}>
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Label>Введите название материала</Form.Label>
                        <Form.Control
                            required
                            style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Введите описание материала</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={20}
                            style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </Form.Group>

                    <Modal.Footer style={{ backgroundColor: "rgb(25 26 34)" }}> </Modal.Footer>
                    
                    <button type="submit" onClick={addMaterial}>
                        <a className='aBtn' style={{ textAlign: "center" }} type="submit" >
                            <span className='spanBtn' type="submit">Добавить</span>
                            <i className='iBtn'></i>
                        </a>
                    </button>

                    <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={onHide}>
                        <span type="submit" className='spanBtn'>Закрыть</span>
                        <i className='iBtn'></i>
                    </a>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateMaterial;