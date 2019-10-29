import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import logic from '../../logic'

function Home ({ history, setUser }) {
    const [, setView] = useState()

    const handleToDetail = (productId) => {
        setView('detail')
        history.push(`/detail/${productId}`)
    }
    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location, setUser])

    return <div>
        <main className="home">
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76a')}} >
                    <img className="home__container--imag" src={require('../../img/products/mochilla_plastic.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Plastic bag</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76b')}} >
                    <img className="home__container--imag" src={require('../../img/products/mochilla_canem.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Cannam bag</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76c')}} >                
                    <img className="home__container--imag" src={require('../../img/products/mochilla_fusta.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Wood bag</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76d')}} >
                    <img className="home__container--imag" src={require('../../img/products/termocompostadora.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Termocompost</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76f')}} >
                    <img className="home__container--imag" src={require('../../img/products/airejador_compostadora.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Varila</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a76e')}} >
                    <img className="home__container--imag" src={require('../../img/products/termometre_compostadora.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">Termometer</div>
                    </div>
                </a>
            </div>  
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a770')}} >
                    <img className="home__container--imag" src={require('../../img/products/hamaca_jardi.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">hammock</div>
                    </div>
                </a>
            </div>
            <div className="home__container">
                <a href='/detail' onClick={event => { event.preventDefault(); handleToDetail('5d7d118cbe9e7a3e5009a771')}} >
                    <img className="home__container--imag" src={require('../../img/products/set_mobles_jardi.jpg')} width="300" alt="foto random"></img>
                    <div className="home__container--middle">
                        <div className="home__container--text">set furniture</div>
                    </div>
                </a>
            </div>
        
            {/* <figure className="random"><img className="home__container--imag" src="https://source.unsplash.com/random/800x552" width="300" alt="foto random"></img></figure> */}
            {/* <Results/> */}
        </main>
    </div>
}
export default withRouter(Home)