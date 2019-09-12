import { validate } from ""

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(name, email, password)
    validate.string(name, 'name')
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(password, 'password')