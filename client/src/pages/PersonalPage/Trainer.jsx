import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneTrainer, createTrainerUser, fetchGames, deleteTrainerUser } from '../../http/trainerAPI';
import jwtDecode from 'jwt-decode';
import UserList from '../../components/UserList/UserList';
import { Context } from '../..';
import MaterialList from '../../components/MaterialList';
import { observer } from 'mobx-react-lite';
import CreateMaterial from '../../components/modals/CreateMaterial';


const Trainer = observer(() => {
    const { trainer } = useContext(Context)
    const { id } = useParams()
    const [games, setGames] = useState([])
    const [materialVisible, setMaterialVisible] = useState(false)

    useEffect(() => {
        fetchGames().then(data => setGames(data))
    }, [])

 
    useEffect(() => {
        fetchOneTrainer(id).then(data => trainer.setTrainer(data))
    }, [id])


    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }
    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    const recording = async () => {
        try {
            const formData = new FormData()
            await formData.append('trainerId', trainer.trainer.id)
            await formData.append('userId', decodeUser.id)
            await createTrainerUser(formData)
            window.location.reload();
        } catch (e) {
            alert('Вы уже записаны у этого тренера')
        }
    }

    const unrecording = async () => {
        try {
            await deleteTrainerUser(trainer.trainer.id, decodeUser.id)
            window.location.reload();
        } catch (e) {
            alert('Вы еще даже не записались')
        }
    }


    return (
        <Container>

            <section className="profile">
                <header className="header">
                    <div className="details">
                        <img src={process.env.REACT_APP_API_URL + trainer.trainer.photo} alt="img" className="profile-pic" />
                        <h1 className="heading">Тренер</h1>
                        <h1 className="heading">{trainer.trainer.name}</h1>
                        <div className="location">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                            </svg>
                            <p> {trainer.trainer.city}</p>
                        </div>
                        <div className="stats">
                            <div className="col-4">
                                <h4>{trainer.trainer.emailTrainer}</h4>
                                <p>Email</p>
                            </div>
                            <div className="col-4">
                                <h4>{trainer.trainer.old}</h4>
                                <p>Возраст</p>
                            </div>
                            <div className="col-4">
                                {games.map(game =>
                                    trainer.trainer.gameId === game.id && <h4 key={trainer.trainer.gameId}>{game.name}</h4>
                                )}
                                <p>Игра</p>
                            </div>
                        </div>
                    </div>
                </header>
            </section>


            {/* <h3>Id: {trainers.id}</h3>
            <h3>Email: {trainers.emailTrainer}</h3>
            <h3>Имя: {trainers.name}</h3>
            <h3>Город: {trainers.city}</h3>
            <h3>Возраст: {trainers.old}</h3>
            <h3>Качества: {trainers.about}</h3>
            <h3>IdGame: {trainers.gameId}</h3> */}

            {/* {games.map(game =>
                trainers.gameId === game.id && <h3 key={trainers.gameId}>Игра: {game.name}</h3>
            )} */}

            {/* <img src={process.env.REACT_APP_API_URL + trainers.photo} width="255px" height="255px" alt='img' />
            <br /><br /> */}

            {!trainer.isAuth &&
                <div className="bntCenter">
                    <a className='aBtn' type="submit" onClick={recording}>
                        <span className='spanBtn'>Записаться</span>
                        <i className='iBtn'></i>
                    </a>
                    <a className='aBtn' type="submit" onClick={unrecording}>
                        <span className='spanBtn'>Отписаться</span>
                        <i className='iBtn'></i>
                    </a>
                </div>
            }

     
            <h1>Список материалов </h1>
            <br />

            <MaterialList />
            <br />

            {trainer.isAuth && decodeTrainer.id === Number(id) &&
                <div>
                    <a className='aBtn' type="submit" onClick={() => setMaterialVisible(true)}>
                        <span className='spanBtn'>Добавить материал</span>
                        <i className='iBtn'></i>
                    </a>
                    <CreateMaterial show={materialVisible} onHide={() => setMaterialVisible(false)} />
                </div>
            }

            <br /><br /><br />
            <h1>Список учеников </h1>
            <br />

            <UserList />
        </Container >
    );
});

export default Trainer;