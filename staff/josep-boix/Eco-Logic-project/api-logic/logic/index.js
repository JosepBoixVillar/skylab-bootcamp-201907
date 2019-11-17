// logic-api

module.exports = {

    //USER
    registerUser: require ('./register-user'),
    authenticateUser: require ('./user-authenticate'),
    unregisterUser: require ('./user-unregister'),
    retrieveUser: require ('./retrieve-user'),
    updateUser: require ('./user-update'),
    //CARD
    registerCard: require('./card-register'),
    unregisterCard: require('./card-unregister'),
    retrieveCard: require('./card-retrieve'),
    retrieveAllCards: require('./card-retrieve-all'),
    // PRODUCT
    searchProduct: require('./search'),
    retrieveProduct: require('./product-retrieve'),
    // ITEM
    // registerItem: require('./item-register'),
    // unregisterItem: require('./item-unregister'),
    //ORDER
    listOrder: require('./order-list'),
    registerOrder: require('./order-register'),
    listOrders: require('./order-list'),
    retrieveAllOrders: require('./order-retrieve-all'),
    // CART
    addToCart: require('./cart-addToCart'),
    listToCart: require('./cart-list'),
    cartRemove: require('./cart-remove')
}