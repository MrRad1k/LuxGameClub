import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { Dropdown, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import { createStatistic, fetchMaterials } from '../../http/trainerAPI';


const CreateStatistic = observer(({ show, onHide }) => {
    const { trainer } = useContext(Context)
    const [rate, setRate] = useState()
    const { id } = useParams()

    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    useEffect(() => {
        if (trainer.isAuth)
            fetchMaterials(decodeTrainer.id).then(data => trainer.setMaterial(data))
    }, [])

    const addStatictic = async() => {
        if (rate !== '') {
            const formData = new FormData()
            await formData.append('rate', rate)
            await formData.append('materialId', trainer.selectedMaterial.id)
            await formData.append("userId", id)
            await createStatistic(formData).then(data => onHide())
            window.location.reload();
        }
    }


    return (
        <Modal show={show} onHide={onHide} centered >
            <Modal.Header closeButton style={{ backgroundColor: "rgb(25 26 34)" }}>
                <Modal.Title>Добавить статистику</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "rgb(25 26 34)" }}>
                <Form>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle>{trainer.selectedMaterial.title || "Выберите материал"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {trainer.materials.map(material =>
                                <Dropdown.Item
                                    onClick={() => trainer.setSelectedMaterial(material)}
                                    key={material.id}
                                    required
                                >
                                    {material.title}
                                </Dropdown.Item>

                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mb-3"
                        style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                        value={rate}
                        required
                        onChange={e => setRate(e.target.value)}
                        placeholder="Введите оценку"
                    />

                    <Modal.Footer style={{ backgroundColor: "rgb(25 26 34)" }}></Modal.Footer>

                    <button type="submit" onClick={addStatictic}>
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
});

export default CreateStatistic;