import { makeAutoObservable } from "mobx";

export default class NewsStore {
    constructor() {
        this._news = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setNews(news) {
        this._news = news
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }


    get news () {
        return this._news
    }
    
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}