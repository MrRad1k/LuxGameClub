const ApiError = require('../error/apiError')
const fetch = require('node-fetch')
const { News } = require('../models/models')


class NewsController {
    async create(req, res, next) {
        try {
            // const response1 = await fetch('https://gnews.io/api/v4/search?q=киберспорт&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
            // const response2 = await fetch('https://gnews.io/api/v4/search?q=игры&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
            // const response3 = await fetch('https://gnews.io/api/v4/search?q=games&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
            const response4 = await fetch('https://gnews.io/api/v4/search?q=battle%20net&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
            const response5 = await fetch('https://gnews.io/api/v4/search?q=ubisoft&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)

            // const data1 = await response1.json()
            // const data2 = await response2.json()
            // const data3 = await response3.json()
            const data4 = await response4.json()
            const data5 = await response5.json()

            // const data = [...data1.articles, ...data2.articles, ...data3.articles]
            const data = [...data4.articles, ...data5.articles]
            let news

            for (let i = 0; i < data.length; i++) {
                news = await News.create({
                    title: data[i].title,
                    description: data[i].description,
                    content: data[i].content,
                    image: data[i].image,
                    publishedAt: data[i].publishedAt
                })
            }

            // return res.json(news)
            return res.json({ data4, data5 })
        } catch (e) { next(ApiError.badRequest(e.message)) }
    }

    // async getAll(req, res, next) {
    //     try {
    //         // const response1 = await fetch('https://gnews.io/api/v4/search?q=киберспорт&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
    //         // const response2 = await fetch('https://gnews.io/api/v4/search?q=игры&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
    //         // const response3 = await fetch('https://gnews.io/api/v4/search?q=games&lang=ru&country=ru&max=100&apikey=' + process.env.GNEWS_API_KEY)
    //         // const data1 = await response1.json()
    //         // const data2 = await response2.json()
    //         // const data3 = await response3.json()
    //         // return res.json({ data1, data2, data3 })
    //     } catch (e) { next(ApiError.badRequest(e.message)) }
    // }

    async getAll(req, res) {
        let { limit, page } = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        const news = await News.findAndCountAll({ limit, offset })
        return res.json(news)
    }

    async getOne(req, res) {
        const { id } = req.params
        const news = await News.findOne({ where: { id } })
        return res.json(news)
    }
}

module.exports = new NewsController()