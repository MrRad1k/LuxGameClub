import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import { fetchOneTrainer, fetchTrainerUser } from '../../http/trainerAPI';
import UserItem from './UserItem';


const UserList = observer(() => {
    const { user } = useContext(Context)
    const [trainer, setTrainer] = useState({})
    const [usertrainer, setUserTrainer] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchOneTrainer(id).then(data => setTrainer(data))
    }, [id])

    useEffect(() => {
        fetchTrainerUser(trainer.id, user.id).then(data => setUserTrainer(data))
    }, [trainer.id, user.id])


    return (
        <Row md={4}>
            {usertrainer.map(usertrainer =>
                user.users.map(user =>
                    usertrainer.trainerId === trainer.id && usertrainer.userId === user.id &&
                    <UserItem key={user.id} user={user} />
                )
            )}
        </Row>
    );
});

export default UserList;