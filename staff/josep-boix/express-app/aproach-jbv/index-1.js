//conseguimos enviar fragmentos de template HTML

const http = require ('http')
const express = require ('express')

const {argv:[,,port]} = process

const app = express() // llama servidor

app.get ('/', (req, res)=> {
    res.send(`<form action="/search">
        <input type="text" name="q">
        <button>Search</button>
        </form>`)
})

// app.get('/pepito', (req, res)=>{
//     res.send(`<div>
//             <h3>pepito<h3>
//             <a href='/'>search</a>
//         </div>`
//     )
// })


app.get ('/search', (req, res)=> {
    let content=''
    const {query: {q}}= req
    debugger

    http.get(`http://duckling-api.herokuapp.com/api/search?q=${q}`, response => {
        response.on ('error', error=> {throw new Error(error)})
        response.on ('data', chunk=> content += chunk)
        response.on ('end', ()=> {
            const jsonData = JSON.parse(content)
            const ducks = jsonData.map(duck =>{
                const {title, imageUrl, price, id} = duck
                return `<li>
                <a href='/ducks/${id}'>
                        <h2>${title}<h2>
                        <img src="${imageUrl}">
                        <span>${price}</span>
                        </a>
                        </li>`
        })
        res.send(`<ul>${ducks.join('')}</ul>`)
        })
    }).on('error', error => console.log(error))
})

app.get('/ducks/:id', (req, res) =>{
    const {params: {id}} = req
    let content = ''
    http.get(`http://duckling-api.herokuapp.com/api/ducks/${id}`, response => {
        response.on ('error', error=> {throw new Error(error)})
        response.on ('data', chunk=> content += chunk)
        response.on ('end', ()=> {
            const duck = JSON.parse(content)
                const {title, imageUrl, price, description, link} = duck
                const htmlResponse = `<article>
                    <h2>${title}<h2>
                    <img src="${imageUrl}">
                    <span>${price}</span>
                    <p>${description}</p>
                    <a href="${link}" target= "_blank">Go To Store</a>
                </article>`
                res.send(htmlResponse)
            })
        })
})

app.listen(port)