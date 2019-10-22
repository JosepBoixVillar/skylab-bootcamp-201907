import registerUser from './user-register'
import authenticateUser from './user-authenticate'
import retrieveUser from './user-retrieve'
import isUserLoggedIn from './user-logged_in'
import logUserOut from './user-log_out'
import searchProducts from './search'
import productDetail from './product-detail'
import retrieveProduct from './product-retrieve'
import addToCart from './cart-addToCart'
import retrieveCart from './cart-retrieve'
import updateCart from './cart-update'

export default {
    // set __credentials__ ({ id, token }) {
    //     sessionStorage.id = id
    //     sessionStorage.token = token
    // },
   
    // get __credentials__ () {
    //     const { id, token } = sessionStorage
    //     return { id, token }
    // },
    
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,
    searchProducts,
    productDetail,
    retrieveProduct,
    addToCart,
    retrieveCart,
    updateCart
}