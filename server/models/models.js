const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Trainer = sequelize.define('trainer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emailTrainer: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    old: { type: DataTypes.INTEGER },
    about: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING }
})

const Game = sequelize.define('game', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    old: { type: DataTypes.INTEGER }
})

const TrainerUser = sequelize.define('trainer_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})


// Trainer.hasMany(TrainerUser)
// TrainerUser.belongsTo(Trainer)

Trainer.belongsToMany(User, {through: TrainerUser})
User.belongsToMany(Trainer, {through: TrainerUser})

User.hasMany(TrainerUser)
TrainerUser.belongsTo(User)

Game.hasMany(Trainer)
Trainer.belongsTo(Game)


module.exports = {
    Trainer,
    Game,
    User,
    TrainerUser,
}