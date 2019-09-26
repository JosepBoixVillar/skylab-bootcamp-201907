import React from 'react'

export default function () {
    return <div>
        <form className="searchPanel" onSubmit = {event => {
            event.preventDefault()
            const query = event.target.query
            onSearch(query)
        }}>
            <input className="searchPanel__input" type="text" name="query" placeholder="search here..."/>
            <button className="searchPanel__btn">🔍</button>
        </form>
    </div>
}