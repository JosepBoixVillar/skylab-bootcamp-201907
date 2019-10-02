import React from 'react'
import { withRouter } from 'react-router-dom'

function Search ({ history }) {

    return <>
        <form className="searchPanel" onSubmit={event => {
            event.preventDefault()
            
            const query = event.target.query.value
            // const { target: { query: { value: query } } } = event
            history.push(`/search/${query}`)
        }}>
            <section className="search">
                <div>
                    <input className="searchPanel__input" type="text" name="query" placeholder=" search here..."/>
                    <button className="searchPanel__btn">🔍</button>
                </div>
            </section>
        </form>

        {/* 
        <section>
            <ul className="ad__ul">
                {search && search.length ? search.map(item => <li  className ="ad" key={item._id}>
                    <a className="ad__a" href={`/#/ads/${item._id}`}>
                        <img class="ad__img" src={item.image}></img>
                        <div class="search__container">
                            <p class="ad__title">{item.title}</p> 
                            <p class="ad__price">{item.price}</p>
                        </div>
                    </a>
                </li>): <p className="ad__none">No hay resultados</p>}
            </ul>
        </section>
        */}
        
    </>
}
export default withRouter(Search)