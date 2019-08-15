function Login(username, password) {
    return `<form action="/login"
        <label>E-mail<input type="email" name="email" value="${username}"/></label>
        <label>Password<input type="password" name="password" value="${password}"/></label>
        <button>Login</button>
        <a href="/">Go back</a>
        </form>`
}

module.exports = Login