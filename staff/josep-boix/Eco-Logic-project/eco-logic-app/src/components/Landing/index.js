import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import Home from '../Home'

import logic from '../../logic'

function Landing ({ history }) {
    const [view, setView] = useState(logic.isUserLogIn() ? 'home' : undefined )

    const handleGoToCart = () => {
        setView('cart')
        history.push('/cart')
    }

    const handleBack = () => {
        setView(undefined)
        history.push('/')
    }

    const handleGoToRegister = () => {
        setView('register')
        history.push('/register')
    }

    const handleGoToLogin = () => {
        setView('login')
        history.push('/login')
    }

    const handleLogout = () => {
        logic.logUserOut()
        setView(undefined)
        history.push('/')
      }    

    return <>
        <Header onRegister={handleGoToRegister} onLogin={handleGoToLogin} onCart={handleGoToCart}/>
        <main className="main">
            <section className="main__welcome">
                <figure >
                    <p className="main__welcome--texto">Welcome to Eco-Logic</p>
                    <img className="main__welcome--img" src={require('../../img/ecommerce-welcome.png')} width="300" alt="foto random"></img></figure>
                    <p className="main__welcome--text">We are proud to see you here let us present you how we could improve our enviroment</p>

                {/* <figure className="img"><img src={require('../../img/products/mochilla_plastic.jpg')} width="300" alt="foto random"></img></figure>
                <figure className="img"><img src={require('../../img/products/mochilla_canem.jpg')} width="300" alt="foto random"></img></figure>
                <figure className="img"><img src={require('../../img/products/mochilla_fusta.jpg')} width="300" alt="foto random"></img></figure>

                <figure className="img"><img src={require('../../img/products/termocompostadora.jpg')} width="300" alt="foto random"></img></figure>
                <figure className="img"><img src={require('../../img/products/airejador_compostadora.jpg')} width="300" alt="foto random"></img></figure>
                <figure className="img"><img src={require('../../img/products/termometre_compostadora.jpg')} width="300" alt="foto random"></img></figure>

                <figure className="img"><img src={require('../../img/products/hamaca_jardi.jpg')} width="300" alt="foto random"></img></figure>
                <figure className="img"><img src={require('../../img/products/set_mobles_jardi.jpg')} width="300" alt="foto random"></img></figure>

                <figure className="img"><img src="https://source.unsplash.com/random/800x552" width="300" alt="foto random"></img></figure> */}
            </section>
        </main>
        <Footer/>
        
    </>
}
export default withRouter(Landing)

// return <div className="App">
// <Route path='/' render={ () => <Landing /> } />

// <Route path="/register" render={ () => <Register onBack={handleBack} onRegister={handleRegister} /> } />
// <Route path="/register_success" render={ () => <RegisterSuccess onLogin={handleGoToLogin} /> } />
// <Route path="/login" render={ () => <Login onBack={handleBack} onLogin={handleLogin} /> } />
// <Route path="/search" render={ () => <Results query={query} /> } />

// <Route path="/cart" render={ () => <Cart onCart={handleGoToCart} /> } />

// { logic.isUserLogIn() && <Route path="/home" render={() => <Home onLogout={handleLogout} /> } />}

// </div>