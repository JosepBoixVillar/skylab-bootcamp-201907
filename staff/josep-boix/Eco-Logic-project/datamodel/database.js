const mongoose = require ('mongoose')

let _connection

const connection = {

    connect(url) {
        return _connection ? 
            _connection 
            : 
            _connection = mongoose.connect(url, { useNewUrlParser: true})

    },

    disconnect() {
        _connection = undefined

        return mongoose.disconnect()
    }
}
module.exports = connection