import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchOneMaterial, deleteMaterial, deleteStatistic, fetchMaterials } from '../http/trainerAPI';
import { createMaterialUser, fetchMaterialUser } from '../http/userAPI';


const Material = observer(() => {
    const { trainer, user } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        fetchOneMaterial(id).then(data => trainer.setMaterial(data))
    }, [id])

    // const del = async () => {
    //     await deleteMaterial(id)
    //    // await deleteStatistic(id)
    //     window.history.back()
    // }

    useEffect(() => {
        fetchMaterials(id).then(data => setMaterials(data))
    }, [id])

    useEffect(() => {
        fetchMaterialUser().then(data => user.setMaterialUser(data))
    }, [])

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }

    const status = async () => {
        try {
            const formData = new FormData()
            await formData.append('materialId', id)
            await formData.append('userId', decodeUser.id)
            await createMaterialUser(formData)
            window.location.reload();
        } catch (e) {
            alert('Вы уже прошли материал')
        }
    }


    return (
        <Container>
            {/* <h1>{trainer.materials.id}</h1> */}
            <br/><br/>
            <h1>{trainer.materials.title}</h1>
            <br/><br/>    <br/><br/>
            <h1>{trainer.materials.text}</h1>

            {/* 
            <a className='aBtn' type="submit" onClick={del}>
                <span className='spanBtn'>Удалить материал</span>
                <i className='iBtn'></i>
            </a> 
            */}

            {!trainer.isAuth && <a className='aBtn' type="submit" onClick={status}>
                <span className='spanBtn'>Прошел</span>
                <i className='iBtn'></i>
            </a>}
        </Container>
    );
});

export default Material;