import { $authHostTrainer, $authHostUser, $host } from "./index";
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

export const createTrainerUser = async (traineruser) => {
    const { data } = await $authHostUser.post('api/trainer_user', traineruser)
    return data
}

export const deleteTrainerUser = async (trainerId, userId) => {
    const { data } = await $host.delete('api/trainer_user/delete', { data: { trainerId, userId } })
    return data
}



export const createMaterial = async (material) => {
    const { data } = await $authHostTrainer.post('api/material', material)
    return data
}

export const fetchMaterials = async (trainerId) => {
    const { data } = await $host.get('api/material', { params: { trainerId } })
    return data
}

export const fetchOneMaterial = async (id) => {
    const { data } = await $host.get('api/material/' + id)
    return data
}

export const deleteMaterial = async (id) => {
    const { data } = await $host.delete('api/material/' + id)
    return data
}

export const updateMaterial = async (id, material) => {
    const { data } = await $host.post('api/material/' + id, material)
    return data
}


export const createStatistic = async (statistic) => {
    const { data } = await $host.post('api/statistic', statistic)
    return data
}

export const fetchStatistics = async (userId) => {
    const { data } = await $host.get('api/statistic', { params: { userId } })
    return data
}

export const deleteStatistic = async (materialId) => {
    const { data } = await $host.delete('api/statistic', materialId)
    return data
}


export const addSteamTrainer = async (id) => {
    const { data1 } = await $host.get('api/trainer/auth/steam/' + id)
    const { data2 } = await $host.get('api/trainer/auth/steam/authenticate', { params: { id } })
    return { data1, data2 }
}

export const addOriginTrainer = async (id, origin) => {
    const { data } = await $host.post('api/trainer/' + id, origin)
    return data
}

export const fetchOneGameStatisticsTrainer = async (id) => {
    const { data } = await $host.get('api/trainer/gamestatistic/' + id)
    return data
}


export const fetchCurrentStatistics = async (id, originName) => {
    const { data } = await $host.post('api/trainer/current_statistics/' + id, { originName })
    return data
}