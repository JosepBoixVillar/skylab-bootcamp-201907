const mongoose = require ('mongoose')

let connection

const _connection = {

    connect(url) {
        return connection ? 
            connection 
            : 
            connection = mongoose.connect(url, { useNewUrlParser: true})

    },

    disconnect() {
        connection = undefined

        return mongoose.disconnect()
    }
}
module.exports = _connection