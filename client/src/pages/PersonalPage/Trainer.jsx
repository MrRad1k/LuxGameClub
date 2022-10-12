import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import UserList from '../../components/UserList/UserList';
import { fetchOneTrainer } from '../../http/trainerAPI';


const Trainer = () => {
    const [trainer, setTrainer] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetchOneTrainer(id).then(data => setTrainer(data))
    }, [id])


    return (
        <Container>
            <h3>Id: {trainer.id}</h3>
            <h3>Email: {trainer.emailTrainer}</h3>
            <h3>Имя: {trainer.name}</h3>
            <h3>Город: {trainer.city}</h3>
            <h3>Возраст: {trainer.old}</h3>
            <h3>Качества: {trainer.about}</h3>
            <h3>IdGame: {trainer.gameId}</h3>

            {trainer.gameId === 1 && <h3>Игра: Counter-Strike: Global Offensive</h3>}
            {trainer.gameId === 2 && <h3>Игра: League of Legends</h3>}
            {trainer.gameId === 3 && <h3>Игра: Dota 2</h3>}

            <img src={process.env.REACT_APP_API_URL + trainer.photo} width="255px" height="255px" alt='img' />
            <br /><br />

            <button>Записаться</button>

            <br /><br /><br />
            <h1>Список учеников </h1>
            <br />
            <UserList />
        </Container>
    );
};

export default Trainer;