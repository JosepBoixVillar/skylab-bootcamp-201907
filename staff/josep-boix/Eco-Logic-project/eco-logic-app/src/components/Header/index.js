import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import Search from '../Search'
import logic from '../../logic'

export default withRouter(function ({ history, view, setView, onLogout }) {
  const [user, setUser] = useState()

  const handleGoToRegister = () => {
    setView('register')
    history.push('/register')
  }

  const handleGoToLogin = () => {
    setView('login')
    history.push('/login')
  }

  const handleGoToCart = () => {
    setView('cart')
    history.push('/cart')
  }

  // const handleGoToFavs = () => {
  //   setView('favs')
  //   history.push('/favs')
  // }

  // const handleGoToCategories = () => {
  //   setView('categories')
  //   history.push('/categories')
  // }

  // const handleGoToCommunity = () => {
  //   setView('community')
  //   history.push('/community')
  // }

  const handleOnLogout = () => {
    logic.logUserOut()

    setView('landing')
    history.push('/')
  }

  useEffect(() => {
    if (logic.isUserLoggedIn())
      (async () => {
          const user = await logic.retrieveUser()
          setUser(user)
      })()
  }, [history.location])

  return <>
    {!logic.isUserLoggedIn() ?
      <header className="header">
        <section className="header__top">
          <h1 className="header__top--title">ECO-LOGIC_APP</h1>
          <ul>
            {view !== 'register' && <button className="btn header__top--register" href="/register" onClick={handleGoToRegister}>Sign up</button>}
            {view !== 'login' && <button className="btn header__top--login" href="/login" onClick={handleGoToLogin}>Log in</button>}
            <button className="btn header__top--cart" href="/cart" onClick={handleGoToCart}>Cart</button>
          </ul>
        </section>
        <section className="header__bottom">
          {/* <button className="btn header__bottom--categories" onClick={handleGoToCategories} >Categories</button> */}
          <div className="header__bottom--search">
            <Search/>
          </div>
          {/* <button className="btn header__bottom--community" onClick={handleGoToCommunity} >Community</button> */}
        </section>
      </header>
      :
      <header className="header">
        <section className="header__top">
          <h1 className="header__top--title">ECO-LOGIC_APP</h1>
          <div className="header__top--nav">
            <ul>
              {/* <button className="btn header__top--favs" href="/favs" onClick={handleGoToFavs}>Fav's</button>  */}
              <button className="btn header__top--cart" href="/cart" onClick={handleGoToCart}>Cart</button>
              <button className="btn header__top--logout" onClick={handleOnLogout}>Log out</button> 
              <li className="header__top">
                <a className="header__top--orders btn" href='/#/view-orders'> View orders</a>
              </li>
              {/* {orders && <button className="btn header__top--cart" href="/orders" onClick={handleGoToOrders}>View Orders</button>} */}
            </ul>
          </div>
        </section>
        <section className="header__bottom">
          {/* <button className="btn header__bottom--categories" onClick={handleGoToCategories} >Categories</button> */}
          <div className="header__bottom--search">
            <Search/>
          </div>
          {/* <button className="btn header__bottom--community" onClick={handleGoToCommunity} >Community</button> */}
        </section>
        <h4 className="header__top--user">Cultiva la vida {user && user.name}</h4>
      </header>          
    }
  </>
})