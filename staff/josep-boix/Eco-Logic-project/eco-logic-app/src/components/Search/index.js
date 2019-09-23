import React from 'react'

export default function ({ onSearch }) {
    return <div className="searchPanel">
        <form onSubmit = {event => {
            event.preventDefault()

            // const { target: { query: { value: query } } } = event
            const query = event.target.query
            onSearch(query)
        }}>
            <input className="searchPanel__input" type="text" name="query" placeholder="busca aquí"/>
            <button className="searchPanel__btn">🔍</button>
        </form>
    </div>
}