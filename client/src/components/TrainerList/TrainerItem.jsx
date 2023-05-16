import React, { useContext, useEffect, useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchGames } from '../../http/trainerAPI';
import { TRAINER_ROUTER, LOGIN_USER_ROUTER } from '../../utils/consts';
import { Context } from '../..';


const TrainerItem = ({ trainer }) => {
    const context = useContext(Context)
    const navigate = useNavigate()

    const check = () => {
        if (!localStorage.tokenUser || !localStorage.tokenTrainer)
            navigate(LOGIN_USER_ROUTER)
        else
            navigate(TRAINER_ROUTER + '/' + trainer.id)
    }


    return (
        <Col className="mt-3" onClick={check} >
            <div className="trcard" >
                <Image className='imgSt' src={process.env.REACT_APP_API_URL + trainer.photo} />
                <h4 style={{ marginLeft: "15px", marginBottom: "25px" }}>Тренер</h4>
                <h5 style={{ marginLeft: "15px", marginBottom: "20px" }}>Почта: {trainer.emailTrainer}</h5>
                <h5 style={{ marginLeft: "15px", marginBottom: "20px" }}>Имя: {trainer.name}</h5>
                {context.trainer.games.map(game =>
                    trainer.gameId === game.id &&
                    <h6 key={trainer.gameId} style={{ marginLeft: "15px" }}>Игра: {game.name}</h6>
                )}
            </div>
        </Col>

    );
};

export default TrainerItem;