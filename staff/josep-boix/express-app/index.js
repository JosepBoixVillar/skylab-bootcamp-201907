const express = require ('express')
const http = require ('http')

const {argv:[,,port]}= process
const app = express() // llama servidor

app.get ('/', (req, res)=> {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
        </form>`)
}).listen (port)

app.get('/pepito', (req, res)=>{
    res.send(`<div>
            <h3>pepito<h3>
            <a href='/'>search</a>
        </div>`
    )
})

app.get ('/search', (req, res)=> {
    debugger
    const {query: {q}}= req
    const url = 
    const request= http.get(url, reposnse =>{
        let content=''
        Response.on ('error', error=> {throw new Error(error)})
        Response.on ('data', chunk=> content += chunk)
        Response.on ('end', ()=> {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(duck =>{
                const {title, imageUrl, price} = duck
                return `<li>
                    <h2>title<h2>
                    <img>
                    <span>
                </li>`
            })
        })
    })
})