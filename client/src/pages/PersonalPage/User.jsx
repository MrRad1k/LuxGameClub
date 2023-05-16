import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import CreateStatistic from '../../components/modals/CreateStatistic';
import Status from '../../components/Status';
import UserItem from '../../components/UserList/UserItem';
import { fetchMaterials, fetchStatistics } from '../../http/trainerAPI';
import { fetchOneUser, addSteam } from '../../http/userAPI';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const User = () => {
    const { user } = useContext(Context)
    const [users, setUser] = useState({})
    const { id } = useParams()
    const [statisticVisible, setStaticticVisible] = useState(false)
    const [statistic, setStatistic] = useState([])
    const [material, setMaterial] = useState([])

    useEffect(() => {
        fetchOneUser(id).then(data => setUser(data))
    }, [id])

    useEffect(() => {
        fetchStatistics(id).then(data => setStatistic(data))
    }, [id])

    useEffect(() => {
        fetchMaterials().then(data => setMaterial(data))
    }, [])

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }

    const add = async () => {
        window.location.replace(process.env.REACT_APP_API_URL + 'api/steam/auth/steam/' + id)
        await addSteam(id)
    }


    return (
        <Container>

            <section className="profile">
                <header className="header">
                    <div className="details">
                        <img src={process.env.REACT_APP_API_URL + users.photo} alt="img" className="profile-pic" />
                        <h1 className="heading">Ученик</h1>
                        <h1 className="heading">{users.name}</h1>
                        <div className="location">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                            </svg>
                            <p> {users.city}</p>
                        </div>
                        <div className="stats">
                            <div className="col-4">
                                <h4>{users.email}</h4>
                                <p>Email</p>
                            </div>
                            <div className="col-4">
                                <h4>{users.old}</h4>
                                <p>Возраст</p>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            {users.steamId ?
                <div>
                    <h1>{users.steamId}</h1>
                </div>
                :
                decodeUser.id === users.id &&
                <div>
                    <div className="bntCenter">
                        <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={add}>
                            <span type="submit" className='spanBtn'> Link Steam</span>
                            <i className='iBtn'></i>
                        </a>
                    </div>
                </div>
            }


            {/* <h3>Id: {users.id}</h3>
            <h3>Email: {users.email}</h3>
            <h3>Имя: {users.name}</h3>
            <h3>Город: {users.city}</h3>
            <h3>Возраст: {users.old}</h3>
            <img src={process.env.REACT_APP_API_URL + users.photo} width="255px" height="255px" alt='img' /> */}


            {!user.isAuth &&
                <div className="bntCenter">
                    <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={() => setStaticticVisible(true)}>
                        <span type="submit" className='spanBtn'> Добавить статистику</span>
                        <i className='iBtn'></i>
                    </a>
                    <CreateStatistic show={statisticVisible} onHide={() => setStaticticVisible(false)} />
                </div>
            }

            <br /><br />
            <h1 className="tblCenter">Статистика</h1>
            <br />

            <div className="tblCenter">
                <table>
                    <tr><th>Материал</th><th>Оценка</th></tr>
                    {statistic.map(st =>
                        material.map(mt =>
                            st.materialId === mt.id &&
                            // <div key={st.id}>
                            //     <h3 key={mt.id}>Материал: {mt.title}</h3>
                            //     <h3>Оценка: {st.rate}</h3>
                            //     <br />
                            // </div>

                            <tr><td>{mt.title}</td><td>{st.rate}</td></tr>
                        )
                    )}
                </table>
            </div>

            <br /><br /><br /><br />

            <h1 className="tblCenter"> Список пройденных материалов </h1>
            <br />
            <Status />

        </Container>
    );
};

export default User;