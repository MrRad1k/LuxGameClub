import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row } from 'react-bootstrap';
import { Context } from '..';
import UserItem from '../components/UserList/UserItem';


const UsersLists = observer(() => {
    const { user } = useContext(Context)


    return (
        <Container>
            <Row md={4}>
                {user.users.map(user =>
                    <UserItem key={user.id} user={user} />
                )}
            </Row>
        </Container>
    );
});

export default UsersLists;