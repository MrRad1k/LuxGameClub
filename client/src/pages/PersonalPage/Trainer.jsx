import React, { useEffect, useState, useContext, useLayoutEffect, useRef } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneTrainer, createTrainerUser, fetchGames, deleteTrainerUser, addSteamTrainer, addOriginTrainer, fetchOneGameStatisticsTrainer, fetchCurrentStatistics } from '../../http/trainerAPI';
import jwtDecode from 'jwt-decode';
import UserList from '../../components/UserList/UserList';
import { Context } from '../..';
import MaterialList from '../../components/MaterialList';
import { observer } from 'mobx-react-lite';
import CreateMaterial from '../../components/modals/CreateMaterial';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


const Trainer = observer(() => {
    const { trainer } = useContext(Context)
    const { id } = useParams()
    const [games, setGames] = useState([])
    const [materialVisible, setMaterialVisible] = useState(false)
    const [originName, setOriginName] = useState('')
    const [loading, setLoading] = useState(false)
    const [gameStatistic, setGameStatistic] = useState([])
    const [currentStatistics, setCurrentStatistics] = useState([])
    const myRef = useRef(null)


    useEffect(() => {
        myRef.current.scrollIntoView();
    }, []);

    useEffect(() => {
        fetchGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        fetchOneTrainer(id).then(data => trainer.setTrainer(data))
    }, [id])

    useEffect(() => {
        fetchOneGameStatisticsTrainer(id).then(data => setGameStatistic(data))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            fetchCurrentStatistics(id, trainer.trainer.originName).then(data => setCurrentStatistics(data))
        }, 1000)
    }, [])

    const statsOrigin = currentStatistics?.dataOrigin?.data?.segments[0]?.stats
    const statsSteam = currentStatistics?.dataSteam?.data?.segments[0]?.stats

    let decodeUser
    if (localStorage.tokenUser) {
        decodeUser = jwtDecode(localStorage.tokenUser)
    }
    let decodeTrainer
    if (localStorage.tokenTrainer) {
        decodeTrainer = jwtDecode(localStorage.tokenTrainer)
    }

    const check = trainer.users.find(tu => tu.userId === decodeUser?.id)

    const recording = async () => {
        try {
            const formData = new FormData()
            await formData.append('trainerId', trainer.trainer.id)
            await formData.append('userId', decodeUser.id)
            await createTrainerUser(formData)
            window.location.reload();
        } catch (e) {
            alert('Вы уже записаны у этого тренера')
        }
    }

    const unrecording = async () => {
        try {
            await deleteTrainerUser(trainer.trainer.id, decodeUser.id)
            window.location.reload();
        } catch (e) {
            alert('Вы еще даже не записались')
        }
    }

    const addSteam = async () => {
        window.location.replace(process.env.REACT_APP_API_URL + 'api/trainer/auth/steam/' + id)
        await addSteamTrainer(id)
    }

    const addOrigin = async () => {
        setLoading(true)
        try {
            await addOriginTrainer(id, { originName: originName }).then().finally(() => setLoading(false))
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
        <Container ref={myRef} >
            <br />
            <section className="profile" >
                <header className="header" >
                    <div className="details" >
                        <img src={process.env.REACT_APP_API_URL + trainer.trainer.photo} alt="img" className="profile-pic" />
                        <h1 className="heading">Тренер</h1>
                        <h1 className="heading">{trainer.trainer.name}</h1>
                        <div className="location">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                            </svg>
                            <p> {trainer.trainer.city}</p>
                        </div>
                        <div className="stats " style={{ justifyContent: 'center' }}>
                            <div style={{ width: '400px' }}>
                                <h4>{trainer.trainer.emailTrainer}</h4>
                                <p>Email</p>
                            </div>
                            <div style={{ width: '400px' }}>
                                <h4>{trainer.trainer.old}</h4>
                                <p>Возраст</p>
                            </div>
                            <div style={{ width: '400px' }}>
                                {games.map(game =>
                                    trainer.trainer.gameId === game.id && <h4 key={trainer.trainer.gameId}>{game.name}</h4>
                                )}
                                <p>Игра</p>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            {!trainer.isAuth &&
                (!check ?
                    <div className="bntCenter">
                        <a className='aBtn' type="submit" onClick={recording}>
                            <span className='spanBtn'>Записаться</span>
                            <i className='iBtn'></i>
                        </a>
                    </div>
                    :
                    <div className="bntCenter">
                        <a className='aBtn' type="submit" onClick={unrecording}>
                            <span className='spanBtn'>Отписаться</span>
                            <i className='iBtn'></i>
                        </a>

                    </div>
                )
            }

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
                                {(trainer.trainer.steamId !== null) ?
                                    <div>
                                        <h1>Аккаунт Steam</h1>
                                        {/* <h1>{trainer.trainer.steamId}</h1> */}
                                        <div className='d-flex'>
                                            <img width='80' height='80' src={trainer.trainer.steamAvatar} alt='steamAvatar' />
                                            <h4 className='ms-4 mt-4'>{trainer.trainer.steamName}</h4>
                                        </div>
                                        <br />
                                        <h1 className="tblCenter">Статистика CS:GO</h1>
                                        <br />
                                        <div className="tblCenter">
                                            <table style={{ background: "rgb(25 26 34)", backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg)" }}>
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
                                    (trainer.isAuth && decodeTrainer.id === trainer.trainer.id) &&
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
                                {(trainer.trainer.originName) ?
                                    <div>
                                        <h1>Аккаунт Origin</h1>
                                        <div className='d-flex'>
                                            <img width='80' height='80' src={trainer.trainer.originAvatar} alt="originAvatar" />
                                            <h4 className='mt-4 ms-4'>{trainer.trainer.originName}</h4>
                                        </div>
                                        <br />
                                        <h1 className="tblCenter">Статистика Apex</h1>
                                        <br />
                                        <div className="tblCenter" >
                                            <table >
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
                                    </div>
                                    :
                                    loading ?
                                        <div> <Spinner animation="border" variant="light" /></div>
                                        :
                                        (trainer.isAuth && decodeTrainer.id === trainer.trainer.id) &&
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
                                                <button type="submit" onClick={addOrigin}>
                                                    <a className='aBtn' style={{ textAlign: "center" }} type="submit" >
                                                        <span className='spanBtn' type="submit">Добавить</span>
                                                        <i className='iBtn'></i>
                                                    </a>
                                                </button>
                                            </Form.Group>
                                        </div>
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>



            <br /><br /><br /><br /><br />
            <h1>Список материалов </h1>
            <br />
            <MaterialList />
            <br />

            {trainer.isAuth && decodeTrainer.id === Number(id) &&
                <div>
                    <a className='aBtn' type="submit" onClick={() => setMaterialVisible(true)}>
                        <span className='spanBtn'>Добавить материал</span>
                        <i className='iBtn'></i>
                    </a>
                    <CreateMaterial show={materialVisible} onHide={() => setMaterialVisible(false)} />
                </div>
            }

            <br /><br /><br />
            <h1>Список учеников </h1>
            <UserList />

        </Container >
    );
});

export default Trainer;