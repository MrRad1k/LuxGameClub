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
