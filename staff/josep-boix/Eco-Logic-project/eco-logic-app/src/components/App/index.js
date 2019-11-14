import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
// import queryString from 'query-string'
import './index.sass'

import Header from '../Header'
import Landing from '../Landing'
import Register from '../Register'
import RegisterSuccess from '../Register-success'
import Login from '../Login'
import Results from '../Results'
import Home from '../Home'
import Detail from '../Detail'
import CartSuccess from '../CartSuccess'
import Cart from '../Cart'
// import Categories from '../Categories'
// import Favs from '../Favs'
import ShowAllOrders from '../ShowAllOrders'
import Footer from '../Footer'
import EndFlow from '../EndFlow'

import logic from '../../logic'
// import UserCart from '../Usercart'

export default withRouter(function () {
  const [user, setUser] = useState()
  const [view, setView] = useState()
  // const [query, setQuery] = useState('')

  // function handleSearch(query) {
  //   setQuery(query)
  //   history.push(`/search?query=${query}`)
  // }

  return <>
    <Header view={view} setView={setView} user={user} setUser={setUser} />

    <Route exact path='/' render={ () => <Landing /> } />
    <Route path="/register" render={ () => <Register /> } />
    <Route path="/register_success" render={ () => <RegisterSuccess /> } />
    <Route path="/login" render={ () => <Login /> } />
    <Route path="/search/:query" render={ props => <Results query={props.match.params.query}  /> } />
    <Route path="/home" render={ () => logic.isUserLoggedIn() ? <Home setView={setView} user={user} setUser={setUser} /> : <Landing/> } /> 
    <Route path="/detail/:productId" render={ () => <Detail /> } /> 
    <Route path="/cart-success" render={ () => <CartSuccess /> } /> 
    <Route path="/cart" render={ () => <Cart setView={setView} user={user} setUser={setUser} /> } />
    {/* <Route path="/categories" render={ () => <Categories/> } /> */}
    {/* <Route path="/favs" render={ () => <Favs/> } /> */}

    <Route path="/view-orders" render={() => <ShowAllOrders /> } />
    <Route path="/thanks" render={ () => <EndFlow/> } />
    {/* <Route path="/cart" render={ () => <Cart /> } />  */}
    <Footer/>
  </>
})  