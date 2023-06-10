import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Context } from '../..';
import CreateStatistic from '../../components/modals/CreateStatistic';
import Status from '../../components/Status';
import { fetchMaterials, fetchStatistics } from '../../http/trainerAPI';
import { fetchOneUser, addSteamUser, addOriginUser, fetchOneGameStatisticsUser, fetchCurrentStatistics } from '../../http/userAPI';
import jwtDecode from 'jwt-decode';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


const User = () => {
    const { user, trainer } = useContext(Context)
    const { id } = useParams()
    const [users, setUser] = useState({})
    const [statisticVisible, setStaticticVisible] = useState(false)
    const [statistic, setStatistic] = useState([])
    const [material, setMaterial] = useState([])
    const [originName, setOriginName] = useState('')
    const [loading, setLoading] = useState(false)
    const [gameStatistic, setGameStatistic] = useState([])
    const [currentStatistics, setCurrentStatistics] = useState([])
    const myRef = useRef(null)


    useEffect(() => {
        myRef.current.scrollIntoView();
    }, []);

    useEffect(() => {
        fetchOneUser(id).then(data => setUser(data))
    }, [id])

    useEffect(() => {
        fetchStatistics(id).then(data => setStatistic(data))
    }, [id])

    useEffect(() => {
        fetchMaterials().then(data => setMaterial(data))
    }, [])

    useEffect(() => {
        fetchOneGameStatisticsUser(id).then(data => setGameStatistic(data))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            fetchCurrentStatistics(id, users.originName).then(data => setCurrentStatistics(data))
        }, 1000)
    }, [])


    const statsOrigin = currentStatistics?.dataOrigin?.data?.segments[0]?.stats
    const statsSteam = currentStatistics?.dataSteam?.data?.segments[0]?.stats

    console.log(statsOrigin)
    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }
    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    const check = trainer.users.find(tu => tu.userId === id)

    const addSteam = async () => {
        window.location.replace(process.env.REACT_APP_API_URL + 'api/user/auth/steam/' + id)
        await addSteamUser(id)
    }

    const addOrigin = async () => {
        setLoading(true)
        try {
            await addOriginUser(id, { originName: originName }).then().finally(() => setLoading(false))
            window.location.reload();
        } catch {
            alert('Такой пользователя не существует!')
        }
    }

    const createDate = new Date(gameStatistic?.createdAt)

    const day = createDate.getDate()
    const month = createDate.getMonth() + 1
    const year = createDate.getFullYear()
    const createDateStr = day + '-' + month + '-' + year

    const currentDate = new Date()
    const currentday = currentDate.getDate()
    const currentmonth = currentDate.getMonth() + 1
    const currentyear = currentDate.getFullYear()
    const currentDateStr = currentday + '-' + currentmonth + '-' + currentyear


    return (
        <Container ref={myRef}>
            <br />

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


            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Steam</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Origin</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {(users.steamId !== null) ?
                                    <div>
                                        <h1>Аккаунт Steam</h1>
                                        {/* <h1>{users.steamId}</h1> */}
                                        <div className='d-flex'>
                                            <img width='80' height='80' src={users.steamAvatar} alt='steamAvatar' />
                                            <h4 className='ms-4 mt-4'>{users.steamName}</h4>
                                        </div>
                                        <br />
                                        <h1 className="tblCenter">Статистика CS:GO</h1>
                                        <br />
                                        <div className="tblCenter">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Название </th>
                                                        <th>Было <p>{createDateStr}</p></th>
                                                        <th>Текущее <p>{currentDateStr}</p></th>
                                                        <th>Прирост</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Всего часов</td>
                                                        <td>{gameStatistic?.csgoTimePlayed?.slice(0, -1).split(',').join('')}</td>
                                                        <td>{statsSteam?.timePlayed.displayValue?.slice(0, -1).split(',').join('') || '-'}</td>
                                                        <td>{statsSteam?.timePlayed?.displayValue?.slice(0, -1).split(',').join('') - gameStatistic?.csgoTimePlayed?.slice(0, -1).split(',').join('') || 0}
                                                            {Math.sign(statsSteam?.timePlayed?.displayValue?.slice(0, -1).split(',').join('') - gameStatistic?.csgoTimePlayed?.slice(0, -1).split(',').join('')) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.timePlayed?.displayValue?.slice(0, -1).split(',').join('') - gameStatistic?.csgoTimePlayed?.slice(0, -1).split(',').join('')) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>К\Д</td>
                                                        <td>{gameStatistic?.csgoKd}</td>
                                                        <td>{statsSteam?.kd.displayValue || '-'}</td>
                                                        <td>{(statsSteam?.kd.displayValue - gameStatistic?.csgoKd || 0).toFixed(2)}
                                                            {Math.sign(statsSteam?.kd.displayValue - gameStatistic?.csgoKd) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.kd.displayValue - gameStatistic?.csgoKd) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>МВП</td>
                                                        <td>{gameStatistic?.csgoMvp}</td>
                                                        <td>{statsSteam?.mvp.value || '-'}</td>
                                                        <td>{statsSteam?.mvp?.value - gameStatistic?.csgoMvp || 0}
                                                            {Math.sign(statsSteam?.mvp?.value - gameStatistic?.csgoMvp) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.mvp?.value - gameStatistic?.csgoMvp) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Всего матчей</td>
                                                        <td>{gameStatistic?.csgoMatchesPlayed}</td>
                                                        <td>{statsSteam?.matchesPlayed.value || '-'}</td>
                                                        <td>{statsSteam?.matchesPlayed?.value - gameStatistic?.csgoMatchesPlayed || 0}
                                                            {Math.sign(statsSteam?.matchesPlayed?.value - gameStatistic?.csgoMatchesPlayed) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.matchesPlayed?.value - gameStatistic?.csgoMatchesPlayed) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Победа, %</td>
                                                        <td>{gameStatistic?.csgoWlPercentage}</td>
                                                        <td>{statsSteam?.wlPercentage.value || '-'}</td>
                                                        <td>{(statsSteam?.wlPercentage?.value - gameStatistic?.csgoWlPercentage || 0).toFixed(2)}
                                                            {Math.sign(statsSteam?.wlPercentage?.value - gameStatistic?.csgoWlPercentage) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.wlPercentage?.value - gameStatistic?.csgoWlPercentage) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Убийства в голову, %</td>
                                                        <td>{gameStatistic?.csgoHeadshotPct}</td>
                                                        <td>{statsSteam?.headshotPct.value || '-'}</td>
                                                        <td>{(statsSteam?.headshotPct?.value - gameStatistic?.csgoHeadshotPct || 0).toFixed(2)}
                                                            {Math.sign(statsSteam?.headshotPct?.value - gameStatistic?.csgoHeadshotPct) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsSteam?.headshotPct?.value - gameStatistic?.csgoHeadshotPct) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    :
                                    (user.isAuth && decodeUser.id === users.id) &&
                                    <div>
                                        <div className="bntCenter">
                                            <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={addSteam}>
                                                <span type="submit" className='spanBtn'> Link Steam</span>
                                                <i className='iBtn'></i>
                                            </a>
                                        </div>
                                    </div>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {users.originName ?
                                    <div>
                                        <h1>Аккаунт Origin</h1>
                                        <div className='d-flex'>
                                            <img width='80' height='80' src={users.originAvatar} alt="originAvatar" />
                                            <h4 className='mt-4 ms-4' >{users.originName}</h4>
                                        </div>
                                        <br />
                                        <h1 className="tblCenter">Статистика Apex</h1>
                                        <br />
                                        <div className="tblCenter">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Название </th>
                                                        <th>Было <p>{createDateStr}</p></th>
                                                        <th>Текущее <p>{currentDateStr}</p></th>
                                                        <th>Прирост</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Уровень</td>
                                                        <td>{gameStatistic?.apexLevel}</td>
                                                        <td>{statsOrigin?.level.value || '-'}</td>
                                                        <td>{statsOrigin?.level.value - gameStatistic?.apexLevel || 0}
                                                            {Math.sign(statsOrigin?.level.value - gameStatistic?.apexLevel) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsOrigin?.level.value - gameStatistic?.apexLevel) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Всего убийств</td>
                                                        <td>{gameStatistic?.apexKills}</td>
                                                        <td>{statsOrigin?.kills.value || '-'}</td>
                                                        <td>{statsOrigin?.kills.value - gameStatistic?.apexKills || 0}
                                                            {Math.sign(statsOrigin?.kills.value - gameStatistic?.apexKills) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsOrigin?.kills.value - gameStatistic?.apexKills) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Рейтинг</td>
                                                        <td>{gameStatistic?.apexRankScoreName} <img width="30" height="25" src={gameStatistic?.apexRankScoreIcon} alt="rank" /></td>
                                                        <td>{statsOrigin?.rankScore.metadata.rankName || '-'} <img width="30" height="25" src={statsOrigin?.rankScore.metadata.iconUrl} /> </td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Рейтинговые очки</td>
                                                        <td>{gameStatistic?.apexRankScore}</td>
                                                        <td>{statsOrigin?.rankScore.value || '-'}</td>
                                                        <td>{statsOrigin?.rankScore.value - gameStatistic?.apexRankScore || 0}
                                                            {Math.sign(statsOrigin?.rankScore.value - gameStatistic?.apexRankScore) === 1 ?
                                                                <i style={{ color: 'greenyellow' }} className="uil uil-arrow-up"></i>
                                                                : Math.sign(statsOrigin?.rankScore.value - gameStatistic?.apexRankScore) === -1 ?
                                                                    <i style={{ color: 'red' }} className="uil uil-arrow-down"></i> :
                                                                    <span style={{ color: 'yellow', paddingLeft: '8px' }}>=</span>}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <br />     <br />
                                        {/* <img src={gameStatistic?.apexRankScoreIcon} alt="rank" /> */}
                                    </div>
                                    :
                                    loading ?
                                        <div> <Spinner animation="border" variant="light" /></div>
                                        :
                                        (user.isAuth && decodeUser.id === users.id) &&
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Origin</Form.Label>
                                                <Form.Control
                                                    required
                                                    style={{ backgroundColor: "#2e303b", color: "white", border: "0" }}
                                                    value={originName}
                                                    onChange={e => setOriginName(e.target.value)}
                                                    placeholder='Введите Origin Name'
                                                />
                                            </Form.Group>

                                            <button type="submit" onClick={addOrigin}>
                                                <a className='aBtn' style={{ textAlign: "center" }} type="submit" >
                                                    <span className='spanBtn' type="submit">Добавить</span>
                                                    <i className='iBtn'></i>
                                                </a>
                                            </button>
                                        </div>
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>


            <br /><br />
            <h1 className="tblCenter">Статистика</h1>
            <br />
            <div className="tblCenter">
                <table style={{ width: '50%' }}>
                    <tbody>
                        <tr><th>Материал</th><th>Оценка</th></tr>
                        {statistic.map(st =>
                            material.map(mt =>
                                st.materialId === mt.id &&
                                <tr key={st.id}><td>{mt.title}</td><td>{st.rate}</td></tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <br />
            {!user.isAuth &&
                !check &&
                <div className="bntCenter">
                    <a className='aBtn' style={{ textAlign: "center" }} type="submit" onClick={() => setStaticticVisible(true)}>
                        <span type="submit" className='spanBtn'> Добавить статистику</span>
                        <i className='iBtn'></i>
                    </a>
                    <CreateStatistic show={statisticVisible} onHide={() => setStaticticVisible(false)} />
                </div>
            }

            <br /><br /><br /><br />

            <h1 className="tblCenter"> Список пройденных материалов </h1>
            <br />
            <Status />
            <br /><br />
        </Container>
    );
};

export default User;