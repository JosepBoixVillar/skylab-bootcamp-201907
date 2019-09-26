import React, { useState } from 'react'
import Search from '../Search'

export default function ({ onRegister, onLogin,  onCart }) {
  const [view] = useState('/')

  return <div>
    <header className="header">
      <section className="header__top">
        <h1 className="header__top--title">ECO-LOGIC_APP</h1>
        {view !== 'home' && <nav>
          <ul>
            {view !== 'register' && <button className="btn header__register" href="/register" onClick={event => {
              event.preventDefault()
              onRegister()
            }}>R</button>}
            {view !== 'login' && <button className="btn header__login" href="/login" onClick={event => {
              event.preventDefault()
              onLogin()
            }}>L</button>}
            <button className="btn header__Cart" href="/cart" onClick={event => {
              event.preventDefault()
              onCart()
            }}>C</button>
          </ul>
        </nav>}
      </section>
      <section className="header__bottom">
          <button className="btn header__bottom--categories">Categories</button>
        <div className="header__bottom--search">
          <Search/>
        </div>
        <button className="btn header__bottom--comunity">Comunity</button>
      </section>
    </header>
  </div>
}