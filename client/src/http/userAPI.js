import axios from "axios";
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

export const addSteam = async (id) => {
    // const { d } = await $host.get('api/steam/auth/steam', {
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     }
    // })
    // return d

    // const { data } = await axios.get("https://www.google.com")
    // return data

    const { data1 } = await $host.get('api/steam/auth/steam/' + id)
    const { data2 } = await $host.get('api/steam/auth/steam/authenticate', { params: { id } })
    return { data1, data2 }
}