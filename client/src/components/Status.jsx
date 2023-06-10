import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchMaterials } from '../http/trainerAPI';
import { fetchMaterialUser } from '../http/userAPI';


const Status = () => {
    const { user } = useContext(Context)
    const [material, setMaterial] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchMaterialUser().then(data => user.setMaterialUser(data))
    }, [user])

    useEffect(() => {
        fetchMaterials().then(data => setMaterial(data))
    }, [])


    return (
        <>
            {user.materialuser.map(mu =>
                (mu.userId === Number(id)) &&
                material.map(m =>
                    (mu.materialId === m.id) &&
                    <h3 className="h3Center" key={mu.id}>{m.title}</h3>
                )
            )}
        </>
    );
};

export default Status;