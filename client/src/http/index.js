import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHostUser = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHostTrainer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptorUser = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('tokenUser')}`
    return config
}

const authInterceptorTrainer = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('tokenTrainer')}`
    return config
}

$authHostUser.interceptors.request.use(authInterceptorUser)
$authHostTrainer.interceptors.request.use(authInterceptorTrainer)

export {
    $host,
    $authHostUser,
    $authHostTrainer
}