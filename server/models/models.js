const sequelize = require('../db')
const { DataTypes } = require('sequelize')

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
    steamId: { type: DataTypes.STRING(40)},
    originName: {type: DataTypes.STRING(100)}
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
    steamId: { type: DataTypes.STRING(40)},
    originName: {type: DataTypes.STRING(100)}
})

const TrainerUser = sequelize.define('trainer_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Material = sequelize.define('material', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    text: { type: DataTypes.TEXT }
})

const Statistic = sequelize.define('statistic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.SMALLINT }
})

const MaterialUser = sequelize.define('material_user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})


// Trainer.hasMany(TrainerUser)
// TrainerUser.belongsTo(Trainer)

Trainer.belongsToMany(User, { through: TrainerUser })
User.belongsToMany(Trainer, { through: TrainerUser })

User.hasMany(TrainerUser)
TrainerUser.belongsTo(User)

Game.hasMany(Trainer)
Trainer.belongsTo(Game)

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
    MaterialUser
}