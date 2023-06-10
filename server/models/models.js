const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const { gzipSync, gunzipSync } = require('zlib')

const Trainer = sequelize.define('trainer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    emailTrainer: { type: DataTypes.STRING(100), unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING(100) },
    photo: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING(50) },
    old: { type: DataTypes.SMALLINT },
    about: { type: DataTypes.STRING },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
    steamId: { type: DataTypes.STRING(40) },
    steamName: { type: DataTypes.STRING(100) },
    steamAvatar: { type: DataTypes.STRING },
    originName: { type: DataTypes.STRING(100) },
    originAvatar: { type: DataTypes.STRING },
})

const Game = sequelize.define('game', {
    id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50) },
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(100), unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING(100) },
    photo: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING(50) },
    old: { type: DataTypes.SMALLINT },
    steamId: { type: DataTypes.STRING(40) },
    steamName: { type: DataTypes.STRING(100) },
    steamAvatar: { type: DataTypes.STRING },
    originName: { type: DataTypes.STRING(100) },
    originAvatar: { type: DataTypes.STRING },
})

const TrainerUser = sequelize.define('trainer_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Material = sequelize.define('material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT  }
})

const Statistic = sequelize.define('statistic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.SMALLINT }
})

const MaterialUser = sequelize.define('material_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const GameStatistic = sequelize.define('game_statistic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    csgoTimePlayed: { type: DataTypes.STRING },
    csgoKd: { type: DataTypes.DOUBLE },
    csgoMvp: { type: DataTypes.INTEGER },
    csgoMatchesPlayed: { type: DataTypes.INTEGER },
    csgoWlPercentage: { type: DataTypes.DOUBLE },
    csgoHeadshotPct: { type: DataTypes.DOUBLE },
    apexLevel: { type: DataTypes.INTEGER },
    apexKills: { type: DataTypes.INTEGER },
    apexRankScore: { type: DataTypes.INTEGER },
    apexRankScoreIcon: { type: DataTypes.STRING },
    apexRankScoreName: { type: DataTypes.STRING },
})

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(1000) },
    content: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    publishedAt: { type: DataTypes.STRING }
})


// Trainer.hasMany(TrainerUser)
// TrainerUser.belongsTo(Trainer)

Trainer.belongsToMany(User, { through: TrainerUser })
User.belongsToMany(Trainer, { through: TrainerUser })

User.hasMany(TrainerUser)
TrainerUser.belongsTo(User)

Game.hasMany(Trainer)
Trainer.belongsTo(Game)

Trainer.hasMany(GameStatistic)
GameStatistic.belongsTo(Trainer)
User.hasMany(GameStatistic)
GameStatistic.belongsTo(User)

Material.belongsToMany(User, { through: MaterialUser })
User.belongsToMany(Material, { through: MaterialUser })

Material.hasMany(Statistic)
Statistic.belongsTo(Material)

User.hasMany(Statistic)
Statistic.belongsTo(User)

Trainer.hasMany(Material)
Material.belongsTo(Trainer)


module.exports = {
    Trainer,
    Game,
    User,
    TrainerUser,
    Material,
    Statistic,
    MaterialUser,
    GameStatistic,
    News
}