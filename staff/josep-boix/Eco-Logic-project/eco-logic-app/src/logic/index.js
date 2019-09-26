import registerUser from './user-register'
// import authenticateUser from './user-authenticate'
// import isUserLoggedIn from './is-user-logged-in'
// import logUserOut from './log-user-out'
// import retrieveUser from './user-retrieve'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    // authenticateUser,
    // isUserLoggedIn,
    // logUserOut,
    // retrieveUser,
}