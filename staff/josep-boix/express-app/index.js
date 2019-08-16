const express = require('express')
const http = require('http')
const session = require('express-session')
const logic = require('./logic')
const parseBody = require('./utils/parse-body')

const { Html, Header, Search, DuckResults, DuckDetail, Register, Login } = require('./components')
// const FileStore = require('session-file-store')(session);

const { argv: [, , port] } = process

const app = express()

app.use(session({
    // store: new FileStore({}),
    secret: 's3cr3t th1ng',
    saveUninitialized: true,
    resave: true
}));


app.get('/', (request, response) => {
    response.send(Html(Search()))
})

app.get('/register', (request, response) => {
    response.send(Html(Register('/register')))
})

app.post('/register', parseBody, (request, response) => {
    const { body } = request
    debugger
    const { name, surname, email, password, repassword } = body

    try {
        logic.registerUser(name, surname, email, password, repassword)
            .then(() => response.send(Html(Register('/'))))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/login', (request, response) => {
    response.send(Html(Login('/login')))
})

app.get('/search', (request, response) => {
    const { query: { q }, session: { userId, token } } = request
    // debugger
    session.query = q

    try {
        logic.searchDucks(userId, token, q)
            .then(ducks => response.send(Html(`${Search(q)}${DuckResults(ducks)}`)))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.get('/ducks/:id', (request, response) => {
    const { params: { id: duckId }, session: { userId, token, query } } = request

    try {
        logic.retrieveDuck(userId, token, duckId)
            .then(duck => response.send(Html(`${Search(query)}${DuckDetail(duck)}`)))
            .catch(error => { throw error })
    } catch (error) {
        throw error
    }
})

app.listen(port)