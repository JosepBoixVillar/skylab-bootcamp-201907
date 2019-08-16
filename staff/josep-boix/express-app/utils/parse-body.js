const qs = require ('querystring')  //The querystring.parse() method parses a URL query string (str) into a collection of key and value pairs.

// function parseBody (request, response, next) {
module.exports = function (request, response, next){

    let body = ''
debugger
    request.on ('data', chunk => body += chunk)
    request.on ('end', () => {
        // EXAMPLE name=n&surname=s&email=e%40mail.com&password=p&repassword=p
        if (body && body.length){
            const keyValues = body.split('&')

            request.body = keyValues.reduce((body, keyValue) => {
                const [key, value] = keyValue.split('=')

                body[key] = qs.unescape (value) 
//calcula un nuevo string  en el cual secuencia de valores hexadecimales son reemplazados con el caracter que representa.
                return body
            }, {})

            next()
        }
    })

}
// module.exports = parseBody