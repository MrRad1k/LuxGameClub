import {MAIN_ROUTER, USER_ROUTER, TRAINER_ROUTER, LOGIN_USER_ROUTER, REGISTRATION_USER_ROUTER, LOGIN_TRAINER_ROUTER, REGISTRATION_TRAINER_ROUTER} from "./utils/consts";
import Main from "./pages/Main";
import Trainer from "./pages/PersonalPage/Trainer"
import User from "./pages/PersonalPage/User"
import AuthUser from './pages/Auth/AuthUser'
import AuthTrainer from './pages/Auth/AuthTrainer'


export const authRouters = [
    {
        path: USER_ROUTER + '/:id',
        Component: <User />
    },
    {
        path: TRAINER_ROUTER + '/:id',
        Component: <Trainer />
    },
]

export const publicRouters = [
    {
        path: MAIN_ROUTER,
        Component: <Main />
    },
    {
        path: LOGIN_USER_ROUTER,
        Component: <AuthUser />
    },
    {
        path: REGISTRATION_USER_ROUTER,
        Component: <AuthUser />
    },
    {
        path: LOGIN_TRAINER_ROUTER,
        Component: <AuthTrainer />
    },
    {
        path: REGISTRATION_TRAINER_ROUTER,
        Component: <AuthTrainer />
    },
]