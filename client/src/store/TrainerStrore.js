import { makeAutoObservable } from "mobx";

export default class TrainerStore {
    constructor() {
        this._isAuth = false
        this._trainer = {}
        this._trainers = []
        this._users = []
        this._games = []
        this._selectedGame = {}
        this._materials = []
        this._selectedMaterial = {}
        // this._page = 1
        // this._totalCount = 0
        // this._limit = 6
        this._isActivated = false
        makeAutoObservable(this)
    }


    setIsAuth(bool) {
        this._isAuth = bool
    }

    setTrainer(trainer) {
        this._trainer = trainer
    }

    setTrainers(trainers) {
        this._trainers = trainers
    }

    setUsers(users) {
        this._users = users
    }

    setGames(games) {
        this._games = games
    }

    setSelectedGame(game) {
        this._selectedGame = game
    }

    setSelectedMaterial(material) {
        this._selectedMaterial = material
    }

    // setPage(page) {
    //     this._page = page
    // }

    // setTotalCount(count) {
    //     this._totalCount = count
    // }

    setMaterial(materials) {
        this._materials = materials
    }

    setIsActivated(bool) {
        this._isActivated = bool
    }


    get isAuth() {
        return this._isAuth
    }

    get trainer() {
        return this._trainer
    }

    get trainers() {
        return this._trainers
    }

    get users() {
        return this._users
    }

    get games() {
        return this._games
    }

    get selectedGame() {
        return this._selectedGame
    }

    get materials() {
        return this._materials
    }

    get selectedMaterial() {
        return this._selectedMaterial
    }

    // get totalCount() {
    //     return this._totalCount
    // }

    // get page() {
    //     return this._page
    // }

    // get limit() {
    //     return this._limit
    // }

    get isActivated() {
        return this._isActivated
    }
}