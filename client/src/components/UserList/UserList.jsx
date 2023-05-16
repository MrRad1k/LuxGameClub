import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '../..';
import { fetchTrainerUser } from '../../http/trainerAPI';
import UserItem from './UserItem';
import { fetchUsers } from '../../http/userAPI';


const UserList = observer(() => {
    const { user, trainer } = useContext(Context)
    const [usertrainer, setUserTrainer] = useState([])

    useEffect(() => {
        fetchTrainerUser(trainer.trainer.id).then(data => setUserTrainer(data))
    }, [trainer.trainer.id])


    return (
        <Row md={4}>
            {usertrainer.map(usertrainer =>
                user.users.map(user =>
                    usertrainer.trainerId === trainer.trainer.id && usertrainer.userId === user.id &&
                    <UserItem key={user.id} user={user} />
                )
            )}
        </Row>
    );
});

export default UserList;