import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { Context } from '..';
import { authRouters, publicRouters } from '../routers';
import { MAIN_ROUTER } from '../utils/consts';


const AppRouter = observer(() => {
    const { user, trainer } = useContext(Context)

    
    return (
        <Routes>
            {(user.isAuth || trainer.isAuth) && authRouters.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            {publicRouters.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}

            <Route path="*" element={<Navigate replace to={MAIN_ROUTER} />} />
        </Routes>
    );
});

export default AppRouter;