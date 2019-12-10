// logic-api

module.exports = {
    //USER
    registerUser: require ('./register-user'),
    authenticateUser: require ('./authenticate-user'),
    unregisterUser: require ('./unregister-user'),
    retrieveUser: require ('./retrieve-user'),
    updateUser: require ('./update-user'),
    //CARD
    registerCard: require('./register-card'),
    unregisterCard: require('./card-unregister'),
    retrieveCard: require('./card-retrieve'),
    retrieveAllCards: require('./card-retrieve-all'),
    // PRODUCT
    searchProduct: require('./search'),
    retrieveProduct: require('./retrieve-product'),
    // ITEM
    // registerItem: require('./item-register'),
    // unregisterItem: require('./item-unregister'),
    //ORDER
    retrieveOrder: require('./retrieve-order'),
    registerOrder: require('./place-order'),
    // retrieveAllOrders: require('./order-retrieve-all'),
    // CART
    addToCart: require('./cart-addToCart'),
    listToCart: require('./retrieve-cart'),
    cartRemove: require('./cart-remove')
}