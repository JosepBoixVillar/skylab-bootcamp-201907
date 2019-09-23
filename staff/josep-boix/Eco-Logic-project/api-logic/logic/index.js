// logic-api

module.exports = {
    registerUser: require ('./user-register'),
    authenticateUser: require ('./user-authenticate'),
    unregisterUser: require ('./user-unregister'),
    retrieveUser: require ('./user-retrieve'),
    updateUser: require ('./user-update'),

    registerCard: require('./card-register'),
    unregisterCard: require('./card-unregister'),
    retrieveCard: require('./card-retrieve'),
    retrieveAllCards: require('./card-retrieve-all'),

    // addToCart: require('./addToCart'),
    listToCart: require('./cart-list'),
    cartRemove: require('./cart-remove'),

    // unregisterItem: require('./unregister'),

    registerOrder: require('./order-register'),
    retrieveOrder: require('./order-register'),
    

}