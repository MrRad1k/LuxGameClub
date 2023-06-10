import { $authHostUser, $host } from "./index";
import jwt_decode from "jwt-decode";


export const registration = async (user) => {
    const { data } = await $host.post('api/user/regUser', user)
    localStorage.setItem('tokenUser', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/loginUser', { email, password })
    localStorage.setItem('tokenUser', data.token)
    return jwt_decode(data.token)
}

export const checkUser = async () => {
    const { data } = await $authHostUser.get('api/user/authUser')
    localStorage.setItem('tokenUser', data.token)
    return jwt_decode(data.token)
}

export const fetchUsers = async () => {
    const { data } = await $host.get('api/user')
    return data
}

export const fetchOneUser = async (id) => {
    const { data } = await $host.get('api/user/' + id)
    return data
}


export const fetchMaterialUser = async (materialId, userId) => {
    const { data } = await $host.get('api/material_user', { params: { materialId, userId } })
    return data
}

export const createMaterialUser = async (materialuser) => {
    const { data } = await $host.post('api/material_user', materialuser)
    return data
}

export const addSteamUser = async (id) => {
    const { data1 } = await $host.get('api/user/auth/steam/' + id)
    const { data2 } = await $host.get('api/user/auth/steam/authenticate', { params: { id } })
    return { data1, data2 }
}

export const addOriginUser = async (id, origin) => {
    const { data } = await $host.post('api/user/' + id, origin)
    return data
}


export const fetchOneGameStatisticsUser = async (id) => {
    const { data } = await $host.get('api/user/gamestatistic/' + id)
    return data
}


export const fetchCurrentStatistics = async (id, originName) => {
    const { data } = await $host.post('api/user/current_statistics/' + id, { originName })
    return data
}