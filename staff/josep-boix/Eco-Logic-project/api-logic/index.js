require ('dotenv').config()

const { database } = require('datamodel')
const express = require('express')
const { name, version } = require('./package')
const routes = require('./routes')
const cors = require('cors')

const {env: { PORT, DB_URL } } = process

database.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        const app = express()
        
        app.use(cors())

        app.use('/api', routes)

        app.listen(PORT, () => console.log(`${name} ${version} up an running on port ${PORT}`))
    })
process.on('SIGINT', () => {
    console.log(`\n${name} ${version} shutting down, disconnecting from DB...`)

    database.disconnect()

    process.exit(0)
})