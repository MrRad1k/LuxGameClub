// import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMaterials } from '../http/trainerAPI';
import { MATERIAL_ROUTER } from '../utils/consts';


const MaterialList = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [materials, setMaterials] = useState([])


    useEffect(() => {
        fetchMaterials(id).then(data => setMaterials(data))
    }, [])

    // let decodeUser
    // if (localStorage.tokenUser) {
    //     decodeUser = jwtDecode(localStorage.tokenUser)
    // }

    // useEffect(() => {
    //     fetchMaterialUser().then(data => user.setMaterialUser(data))
    // }, [])


    return (
        <>
            {materials.map(material =>
                <div key={material.id} className="d-flex" style={{ cursor: "pointer" }} >
                    <Form  onClick={() => navigate(MATERIAL_ROUTER + '/' + material.id)} >
                        <h3>{material.title}</h3>
                    </Form>
                </div>
            )}
        </>
    );
};

export default MaterialList;