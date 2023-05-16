import { observer } from 'mobx-react-lite';
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../..';
import { login, registration } from '../../http/userAPI';
import { LOGIN_USER_ROUTER, MAIN_ROUTER, REGISTRATION_USER_ROUTER } from '../../utils/consts';


const AuthUser = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_USER_ROUTER
    const isReg = location.pathname === REGISTRATION_USER_ROUTER

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState(null)
    const [city, setCity] = useState('')
    const [old, setOld] = useState(0)

    const selectFile = (e) => setPhoto(e.target.files[0])

    const click = async () => {
        try {
            const formData = new FormData()

            if (isLogin) {
                await login(email, password)
            } else {
                await formData.append('email', email)
                await formData.append('password', password)
                await formData.append('name', name)
                await formData.append('photo', photo)
                await formData.append('city', city)
                await formData.append('old', old)
                await registration(formData)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(MAIN_ROUTER)
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }
 
    useEffect(() => {
        if (isReg) navigate(LOGIN_USER_ROUTER)   
    }, [])


    return (
        <div className="section ">

            <div className="container">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center py-5">
                        <div className="section pb-5 pt-5 pt-sm-2 text-center">
                            <h6 className="mb-0 pb-3"><span>Авторизация </span><span>Регистрация</span></h6>
                            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />

                            {isLogin ?
                                <label htmlFor="reg-log" onClick={() => navigate(REGISTRATION_USER_ROUTER)}></label>
                                :
                                <label htmlFor="reg-log" onClick={() => navigate(LOGIN_USER_ROUTER)}></label>
                            }

                            <div className="card-3d-wrap mx-auto">
                                <div className="card-3d-wrapper">

                                    <div className="card-front">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Авторизация ученика</h4>
                                                <div className="form-group">
                                                    <input type="email" className="form-style" placeholder="Введите Email" value={email} onChange={e => setEmail(e.target.value)} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="password" className="form-style" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>

                                                <div className="con">
                                                    <a href="#/" className='aBtn' type="submit" onClick={click}>
                                                        <span className='spanBtn'>Войти</span>
                                                        <i className='iBtn'></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-back">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Регистрация ученика</h4>
                                                <div className="form-group mt-2">
                                                    <input type="email" className="form-style" placeholder="Введите Email" value={email} onChange={e => setEmail(e.target.value)} />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="password" className="form-style" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input className="form-style" placeholder="Введите Имя и Фамилию" value={name} onChange={e => setName(e.target.value)} />
                                                    <i className="input-icon uil-user"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="file" className="form-style" onChange={selectFile} />
                                                    <i className="input-icon uil-image"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input className="form-style" placeholder="Введите город" value={city} onChange={e => setCity(e.target.value)} />
                                                    <i className="input-icon uil-map-marker-alt"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="number" className="form-style" min="12" value={old} onChange={e => setOld(e.target.value)} />
                                                    <i className="input-icon uil-18-plus"></i>
                                                </div>

                                                <div className="con">
                                                    <a href="#/" className='aBtn' type="submit" onClick={click}>
                                                        <span className='spanBtn'>Регистрация</span>
                                                        <i className='iBtn'></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
});

export default AuthUser;