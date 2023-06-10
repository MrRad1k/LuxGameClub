import { MAIN_ROUTER, USER_ROUTER, TRAINER_ROUTER, LOGIN_USER_ROUTER, REGISTRATION_USER_ROUTER, LOGIN_TRAINER_ROUTER, REGISTRATION_TRAINER_ROUTER, ACTIVATE_ROUTER, USERS_LISTS_ROUTER, MATERIAL_ROUTER, NEWS_ROUTER } from "./utils/consts";
import Main from "./pages/Main";
import Trainer from "./pages/PersonalPage/Trainer"
import User from "./pages/PersonalPage/User"
import AuthUser from './pages/Auth/AuthUser'
import AuthTrainer from './pages/Auth/AuthTrainer'
import Activate from "./pages/Activate";
import UsersLists from "./pages/UsersLists";
import Material from "./pages/Material";
import News from "./pages/News"


export const authRouters = []

export const publicRouters = [
    {
        path: MAIN_ROUTER,
        Component: <Main />
    },
    {
        path: TRAINER_ROUTER + '/:id',
        Component: <Trainer />
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
    {
        path: ACTIVATE_ROUTER + '/:link/:email',
        Component: <Activate />
    },
    {
        path: USERS_LISTS_ROUTER,
        Component: <UsersLists />
    },
    {
        path: MATERIAL_ROUTER + '/:id',
        Component: <Material />
    },
    {
        path: USER_ROUTER + '/:id',
        Component: <User />
    },
    {
        path: NEWS_ROUTER + '/:id',
        Component: <News />
    }
]