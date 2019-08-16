// function Search(query) {
module.exports = function (query){

    return `<form action="/search">
        <input type="text" name="q" value="${query || ''}">
        <button>Search</button>
    </form>
    <a href="/register">Register</a>
    <a href="/login">Login</a>`

}
// module.exports = Search