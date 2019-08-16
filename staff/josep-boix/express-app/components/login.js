// function Login(username, password) {
module.exports = function (path){

    return `<form method="post" action="${path}"
        <label>E-mail<input type="email" name="email" placeholder="username"/></label>
        <label>Password<input type="password" name="password" placeholder="password"/></label>
    </form>
    <button>Login</button>
    <a href="/">Go back</a>`

}
// module.exports = Login