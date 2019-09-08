// logic-api

module.exports = {

    registerUser: require ('./user-register'),
    authenticateUser: require ('./user-authenticate'),
    unregisterUser: require ('./user-unregister'),
    retrieveUser: require ('./user-retrieve'),
    updateUser: require ('./user-update'),

    registerCard: require('./card-register'),
    unregisterCard: require('./card-unregister'),
    // retrieveCard: require('./card-retrieve'),
}