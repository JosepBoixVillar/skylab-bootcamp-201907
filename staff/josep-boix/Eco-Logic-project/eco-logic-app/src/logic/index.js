import registerUser from './user-register'
import authenticateUser from './user-authenticate'
// import retrieveUser from './user-retrieve'
import isUserLogIn from './user-logged_in'
import logUserOut from './user-log_out'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    authenticateUser,
    // retrieveUser,
    isUserLogIn,
    logUserOut,
}