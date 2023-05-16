import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchMaterials } from '../http/trainerAPI';
import { fetchMaterialUser } from '../http/userAPI';
import { MATERIAL_ROUTER } from '../utils/consts';


const MaterialList = () => {
    const { user } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        fetchMaterials(id).then(data => setMaterials(data))
    }, [id])

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }

    // useEffect(() => {
    //     fetchMaterialUser().then(data => user.setMaterialUser(data))
    // }, [])


    return (
        <>
            {materials.map(material =>
                <Form key={material.id} onClick={() => navigate(MATERIAL_ROUTER + '/' + material.id)}>
                    <h3>{material.title}</h3>
                </Form>
            )}
        </>
    );
};

export default MaterialList;