import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._users = []
        this._materialuser = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setUsers(users) {
        this._users = users
    }

    setMaterialUser(materialuser) {
        this._materialuser = materialuser
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get users() {
        return this._users
    }

    get materialuser() {
        return this._materialuser
    }
}