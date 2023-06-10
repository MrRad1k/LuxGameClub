import React, { useEffect } from 'react';
import { useState } from 'react';
import { createMaterial, updateMaterial } from '../../http/trainerAPI';
import { Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


const CreateMaterial = ({ show, onHide, edit }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { id } = useParams()

    const addMaterial = async () => {
        if (content !== '')
            await createMaterial({ title: title, content: content, trainerId: id }).then(data => {
                setTitle('')
                setContent('')
                onHide()
            })
    }
 
    const [edits, setEdit] = useState('')

    useEffect(() => { 
        setEdit(edit?.title) 
        setContent(edit?.content)
    }, [edit?.title, edit?.content])

    const editMateria = async () => {
        await updateMaterial(id, { title: edits, content: content }).then(data => {
            setTitle('')
            setContent('')
            onHide()
        })
    }


    return (
        <Modal size="xl" show={show} onHide={onHide} >
            <Modal.Header closeButton style={{ backgroundColor: "rgb(25 26 34)" }}>
                <Modal.Title>Добавить материал</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "rgb(25 26 34)" }}>

                {!edit &&
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Введите название материала</Form.Label>
                            <Form.Control
                                required
                                style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Editor
                                value={content}
                                onTextChange={(e) => setContent(e.htmlValue)}
                                style={{ height: "613px" }}
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
                }


                {edit &&
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Введите название материала</Form.Label>

                            <Form.Control
                                required
                                style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                                value={edits}
                                onChange={(e) => setEdit(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Editor
                                value={edit.content}
                                onTextChange={(e) => setContent(e.htmlValue)}
                                style={{ height: "613px" }}
                            />
                        </Form.Group>

                        <Modal.Footer style={{ backgroundColor: "rgb(25 26 34)" }}> </Modal.Footer>

                        <button type="submit" onClick={editMateria}>
                            <a className='aBtn' style={{ textAlign: "center" }} type="submit" >
                                <span className='spanBtn' type="submit">Сохранить</span>
                                <i className='iBtn'></i>
                            </a>
                        </button>

                        <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={onHide}>
                            <span type="submit" className='spanBtn'>Закрыть</span>
                            <i className='iBtn'></i>
                        </a>
                    </Form>
                }
            </Modal.Body>
        </Modal>
    );
};

export default CreateMaterial;