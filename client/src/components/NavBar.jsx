import React, { useContext, useEffect } from 'react';
import { Context } from '../index';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import { MAIN_ROUTER, USER_ROUTER, TRAINER_ROUTER, LOGIN_TRAINER_ROUTER, LOGIN_USER_ROUTER } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { fetchUsers } from '../http/userAPI';


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
        if (!decodeTrainer.isActivated) {
            localStorage.clear();
            alert('Заявка принята на рассмотрение')
        }
    }

    useEffect(() => {
        fetchUsers().then(data => user.setUsers(data))
    }, [])


    return (
        <Navbar style={{ background: "rgb(25 26 34)" }}>
            <Container>

                <Navbar.Brand style={{ color: "white" }} href={MAIN_ROUTER}>LuxGame Club</Navbar.Brand>

                {user.isAuth || trainer.isAuth ?
                    <Nav>
                        <Dropdown className='d-flex'>
                            {decodeTrainer.isActivated ?
                                trainer.trainers.map(trainer =>
                                    localStorage.tokenTrainer &&
                                    decodeTrainer.id === trainer.id &&

                                    <Dropdown.Toggle>
                                        <img width="31" height="31" src={process.env.REACT_APP_API_URL + trainer.photo} />
                                    </Dropdown.Toggle>
                                ) :
                                user.isAuth ?
                                    user.users.map(user =>
                                        localStorage.tokenUser &&
                                        decodeUser.id === user.id &&

                                        <Dropdown.Toggle>
                                            <img width="31" height="31" src={process.env.REACT_APP_API_URL + user.photo} />
                                        </Dropdown.Toggle>
                                    ) :
                                    <a className='aBtn' type="submit" onClick={() => logOut()}>
                                        <span className='spanBtn'>Выйти</span>
                                        <i className='iBtn'></i>
                                    </a>
                            }

                            <Dropdown.Menu>
                                {decodeTrainer.isActivated ? trainer.trainers.map(trainer =>
                                    localStorage.tokenTrainer &&
                                    decodeTrainer.id === trainer.id &&

                                    <div className="dvS">Вы: {trainer.name}</div>
                                ) :
                                    user.isAuth &&
                                    user.users.map(user =>
                                        localStorage.tokenUser &&
                                        decodeUser.id === user.id &&

                                        <div className="dvS">Вы: {user.name}</div>
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

                        {/* <a className='aBtn' type="submit"
                            onClick={user.isAuth ?
                                () => navigate(USER_ROUTER + "/" + decodeUser.id)
                                :
                                trainer.isAuth ?
                                    () => navigate(TRAINER_ROUTER + "/" + decodeTrainer.idTrainer)
                                    :
                                    () => navigate(MAIN_ROUTER)
                            }>

                            <span className='spanBtn'>Мой профиль</span>
                            <i className='iBtn'></i>
                        </a>
                        <a className='aBtn' type="submit" onClick={() => logOut()}>
                            <span className='spanBtn'>Выйти</span>
                            <i className='iBtn'></i>
                        </a> */}

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