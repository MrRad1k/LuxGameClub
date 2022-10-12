import { $authHostTrainer, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (trainer) => {
    const { data } = await $host.post('api/trainer/regTrainer', trainer)
    localStorage.setItem('tokenTrainer', data.token)
    return jwt_decode(data.token)
}

export const login = async (emailTrainer, password) => {
    const { data } = await $host.post('api/trainer/loginTrainer', { emailTrainer, password })
    localStorage.setItem('tokenTrainer', data.token)
    return jwt_decode(data.token)
}

export const checkTrainer = async () => {
    const { data } = await $authHostTrainer.get('api/trainer/authTrainer')
    localStorage.setItem('tokenTrainer', data.token)
    return jwt_decode(data.token)
}

export const fetchTrainers = async (gameId) => {
    const { data } = await $host.get('api/trainer', { params: { gameId } })
    return data
}

export const fetchOneTrainer = async (id) => {
    const { data } = await $host.get('api/trainer/' + id)
    return data
}

export const fetchGames = async () => {
    const { data } = await $host.get('api/game')
    return data
}

export const fetchTrainerUser = async (trainerId, userId) => {
    const { data } = await $host.get('api/trainer_user', { params: { trainerId, userId } })
    return data
}