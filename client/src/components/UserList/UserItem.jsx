import React from 'react';
import { Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTER, LOGIN_USER_ROUTER } from '../../utils/consts';


const UserItem = ({ user }) => {
    const navigate = useNavigate()

    const check = () => {
        if (!localStorage.tokenUser && !localStorage.tokenTrainer)
            navigate(LOGIN_USER_ROUTER)
        else
            navigate(USER_ROUTER + '/' + user.id)
    }

    return (
        <Col className="mt-3" onClick={check}>
            <div className="trcard" >
                <Image className='imgSt' src={process.env.REACT_APP_API_URL + user.photo} />
                <h4 style={{ marginLeft: "15px", marginBottom: "25px" }}>Ученик</h4>
                <h5 style={{ marginLeft: "15px", marginBottom: "20px" }}>Почта: {user.email}</h5>
                <h5 style={{ marginLeft: "15px", marginBottom: "20px" }}>Имя: {user.name}</h5>
            </div>
        </Col>
    );
};

export default UserItem;