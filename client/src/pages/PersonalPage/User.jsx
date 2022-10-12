import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneUser } from '../../http/userAPI';


const User = () => {
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetchOneUser(id).then(data => setUser(data))
    }, [])


    return (
        <Container>
            <h3>Id: {user.id}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Имя: {user.name}</h3>
            <h3>Город: {user.city}</h3>
            <h3>Возраст: {user.old}</h3>
            <img src={process.env.REACT_APP_API_URL + user.photo} width="255px" height="255px" alt='img' />
        </Container>
    );
};

export default User;