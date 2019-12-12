import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import isUserLoggedIn from './user-logged_in'
import logUserOut from './user-log_out'
import searchProducts from './search'
import retrieveProduct from './retrieve-product'
import productDetail from './product-detail'
import addToCart from './add-to-cart'
import retrieveCart from './retrieve-cart'
// import updateCart from './cart-update'
import removeCart from './update-cart'
import placeOrder from './place-order'
import retrieveOrder from './retrieve-order'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    isUserLoggedIn,
    logUserOut,
    registerUser,
    authenticateUser,
    retrieveUser,
    searchProducts,
    productDetail,
    retrieveProduct,
    addToCart,
    retrieveCart,
    removeCart,
    placeOrder,
    retrieveOrder
}

    // set __credentials__ ({ id, token }) {
    //     sessionStorage.id = id
    //     sessionStorage.token = token
    // },
   
    // get __credentials__ () {
    //     const { id, token } = sessionStorage
    //     return { id, token }
    // },