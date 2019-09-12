// logic-api

module.exports = {

    register: require ('./user-register'),
    authenticate: require ('./user-authenticate'),
    unregister: require ('./user-unregister'),
    retrieve: require ('./user-retrieve'),
    update: require ('./user-update')
}