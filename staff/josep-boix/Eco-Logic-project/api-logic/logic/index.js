// logic-api

module.exports = {

    //USER
    registerUser: require ('./register-user'),
    authenticateUser: require ('./authenticate-user'),
    retrieveUser: require ('./retrieve-user'),
    unregisterUser: require ('./user-unregister'),
    updateUser: require ('./user-update'),
    //CARD
    registerCard: require('./card-register'),
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
<<<<<<< HEAD
    retrieveOrder: require('./retrieve-order'),
    registerOrder: require('./place-order'),
    // retrieveOrders: require('./retrieve-order'),
    // retrieveAllOrders: require('./order-retrieve-all'),
=======
    listOrder: require('./order-list'),
    registerOrder: require('./order-register'),
    listOrders: require('./order-list'),
    retrieveAllOrders: require('./order-retrieve-all'),
>>>>>>> d4ebfe93fc5ea10758ac6afeb0a6497025b210e2
    // CART
    addToCart: require('./cart-addToCart'),
    listToCart: require('./retrieve-cart'),
    cartRemove: require('./cart-remove')
}