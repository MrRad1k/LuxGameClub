import { $host } from "./index";


export const fetchAllNews = async (page, limit = 5) => {
    const { data } = await $host.get('api/news', { params: { page, limit } })
    return data
}

export const fetchOneNews = async (id) => {
    const { data } = await $host.get('api/news/' + id)
    return data
}