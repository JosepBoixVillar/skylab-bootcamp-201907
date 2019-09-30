import registerUser from './user-register'
import authenticateUser from './user-authenticate'
import retrieveUser from './user-retrieve'
import isUserLogIn from './user-logged_in'
import logUserOut from './user-log_out'
import searchProducts from './search'

export default {
    set __token__(token) {
        debugger
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    isUserLogIn,
    logUserOut,
    retrieveUser,
    searchProducts,
}