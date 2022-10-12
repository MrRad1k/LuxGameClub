import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TRAINER_ROUTER } from '../../utils/consts';


const TrainerItem = ({ trainer }) => {
    const navigate = useNavigate()

    const check = () => {
        if (!localStorage.tokenUser && !localStorage.tokenTrainer)
            alert('Аавторизируйтесь')
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

                {trainer.gameId === 1 && <h6 style={{ marginLeft: "15px" }}>Игра: Counter-Strike: Global Offensive</h6>}
                {trainer.gameId === 2 && <h6 style={{ marginLeft: "15px" }}>Игра: League of Legends</h6>}
                {trainer.gameId === 3 && <h6 style={{ marginLeft: "15px" }}>Игра: Dota 2</h6>}
            </div>
        </Col>

    );
};

export default TrainerItem;