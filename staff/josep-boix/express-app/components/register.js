function Register() {
    return `<form action = "/register">
            <label>Name<input type="text" name="name" /></label>
            <label>Surname<input type="text" name="surname" /></label>
            <label>E-mail<input type="email" name="email" /></label>
            <label>Password<input type="password" name="password" /></label>
            <label>Repeat password<input type="password" name="repassword" /></label>
            <button>Register</button>
            <a href="/">Go back</a>
        </form>`
}

module.exports = Register