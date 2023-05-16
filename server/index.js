require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./db')
//const models = require('./models/models')
const router = require('./routers/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')


const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    // headers: {
    //     "Access-Control-Allow-Origin": "*"
    // }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        //await sequelize.sync()
        await sequelize.sync({ alter: true })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) { console.log(e) }
}

start()