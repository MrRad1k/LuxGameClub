import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import { MAIN_ROUTER, USER_ROUTER, TRAINER_ROUTER, LOGIN_TRAINER_ROUTER, LOGIN_USER_ROUTER, USERS_LISTS_ROUTER } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { fetchUsers } from '../http/userAPI';
import { fetchTrainers } from '../http/trainerAPI';


const NavBar = observer(() => {
    const { user, trainer } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        trainer.setTrainer({})
        trainer.setIsAuth(false)
        localStorage.clear();
        navigate(MAIN_ROUTER)
    }

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }
    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    useEffect(() => {
            fetchUsers().then(data => user.setUsers(data))
            fetchTrainers().then(data => trainer.setTrainers(data))
    }, [user, trainer])


    return (
        <Navbar style={{ background: "rgb(25 26 34)" }}>
            <Container>

                <Navbar.Brand style={{ color: "white" }} href={MAIN_ROUTER}>LuxGame Club</Navbar.Brand>

                <Nav>
                    <a className='aBtn' type="submit" onClick={() => navigate(USERS_LISTS_ROUTER)}>
                        <span className='spanBtn'>Список учеников</span>
                        <i className='iBtn'></i>
                    </a>
                </Nav>

                {trainer.isAuth || user.isAuth ?
                    <Nav>
                        <Dropdown className='d-flex'>
                            {trainer.isAuth &&
                                trainer.trainers.map(trainer =>
                                    localStorage.tokenTrainer &&
                                    decodeTrainer.id === trainer.id &&

                                    <Dropdown.Toggle key={trainer.id}>
                                        <img width="31" height="31" src={process.env.REACT_APP_API_URL + trainer.photo} alt="trainer" />
                                    </Dropdown.Toggle>
                                )
                            }
                            {user.isAuth &&
                                user.users.map(user =>
                                    localStorage.tokenUser &&
                                    decodeUser.id === user.id &&

                                    <Dropdown.Toggle key={user.id}>
                                        <img width="31" height="31" src={process.env.REACT_APP_API_URL + user.photo} alt="user" />
                                    </Dropdown.Toggle>
                                )
                            }

                            <Dropdown.Menu>
                                {trainer.isAuth ?
                                    trainer.trainers.map(trainer =>
                                        localStorage.tokenTrainer &&
                                        decodeTrainer.id === trainer.id &&

                                        <div key={trainer.id} className="dvS">Вы: {trainer.name}</div>
                                    ) :
                                    user.isAuth &&
                                    user.users.map(user =>
                                        localStorage.tokenUser &&
                                        decodeUser.id === user.id &&

                                        <div key={user.id} className="dvS">Вы: {user.name}</div>
                                    )
                                }

                                <Dropdown.Divider />
                                <Dropdown.Item
                                    onClick={user.isAuth ?
                                        () => navigate(USER_ROUTER + "/" + decodeUser.id)
                                        :
                                        trainer.isAuth ?
                                            () => navigate(TRAINER_ROUTER + "/" + decodeTrainer.id)
                                            :
                                            () => navigate(MAIN_ROUTER)}
                                >
                                    Мой профиль
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => logOut()}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    :
                    <Nav>

                        <a className='aBtn' type="submit" onClick={() => navigate(LOGIN_TRAINER_ROUTER)}>
                            <span className='spanBtn'>Стать тренером</span>
                            <i className='iBtn'></i>
                        </a>
                        <a className='aBtn' type="submit" onClick={() => navigate(LOGIN_USER_ROUTER)}>
                            <span className='spanBtn'>Стать учеником</span>
                            <i className='iBtn'></i>
                        </a>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;