function Search(query) {
    return `<form action="/search">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
    </form>`
}

module.exports = Search