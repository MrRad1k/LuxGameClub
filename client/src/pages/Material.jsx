import jwtDecode from 'jwt-decode';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchOneMaterial, deleteMaterial, deleteStatistic, fetchMaterials } from '../http/trainerAPI';
import { checkUser, createMaterialUser, fetchMaterialUser } from '../http/userAPI';
import CreateMaterial from '../components/modals/CreateMaterial';


const Material = observer(() => {
    const { trainer, user } = useContext(Context)
    const { id } = useParams()
    const navigate = useNavigate()
    const [materials, setMaterials] = useState([])

    const [materialVisible, setMaterialVisible] = useState(false)
    const [test, setTest] = useState([])

    useEffect(() => {
        fetchOneMaterial(id).then(data => trainer.setMaterial(data))
    }, [id])

    const del = async () => {
        await deleteMaterial(id)
        // await deleteStatistic(id)
        window.history.back()
    }

    useEffect(() => {
        fetchMaterialUser().then(data => user.setMaterialUser(data))
    }, [])

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }
    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    useEffect(() => {
        fetchMaterials(decodeTrainer?.id).then(data => setMaterials(data))
    }, [decodeTrainer?.id])

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

    const trainerCheck = materials.filter((i) => {
        if (i.id == id) return i.trainerId
    })

    const userCheck = user.materialuser.filter((i) => {
        if (i.materialId == id) return i.userId
    })


    return (
        <Container>

            <h1>{trainer.materials.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: trainer.materials.content }} />

            {trainer.isAuth && trainerCheck[0]?.trainerId &&
                <div >
                    <a className='aBtn' type="submit" onClick={() => setMaterialVisible(true)}>
                        <span className='spanBtn'>Редактировать</span>
                        <i className='iBtn'></i>
                    </a>

                    <CreateMaterial edit={trainer.materials} show={materialVisible} onHide={() => setMaterialVisible(false)} />

                    <a className='aBtn' type="submit" onClick={del}>
                        <span className='spanBtn'>Удалить</span>
                        <i className='iBtn'></i>
                    </a>
                </div>
            }

            {!trainer.isAuth && !userCheck[0]?.userId && <a className='aBtn' type="submit" onClick={status}>
                <span className='spanBtn'>Прошел</span>
                <i className='iBtn'></i>
            </a>}
        </Container>
    );
});

export default Material;