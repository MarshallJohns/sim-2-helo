require('dotenv').config()
const massive = require('massive')
const express = require('express')
const app = express()


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
app.use(express.json())


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB READY')
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})