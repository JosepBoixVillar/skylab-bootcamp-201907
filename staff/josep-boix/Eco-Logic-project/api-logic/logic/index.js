// logic-api
module.exports = {
    //USER
    registerUser: require ('./user-register'),
    authenticateUser: require ('./user-authenticate'),
    unregisterUser: require ('./user-unregister'),
    retrieveUser: require ('./user-retrieve'),
    updateUser: require ('./user-update'),
    //CARD
    registerCard: require('./card-register'),
    unregisterCard: require('./card-unregister'),
    retrieveCard: require('./card-retrieve'),
    retrieveAllCards: require('./card-retrieve-all'),
    // ITEM
    unregisterItem: require('./item-unregister'),
    //ORDER
    registerOrder: require('./order-register'),
    retrieveOrder: require('./order-register'),
    // CART
    // addToCart: require('./addToCart'),
    listToCart: require('./cart-list'),
    cartRemove: require('./cart-remove')
}