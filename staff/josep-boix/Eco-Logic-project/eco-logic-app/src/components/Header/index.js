import React, { useState } from 'react'

export default function ({ onRegister, onLogin }) {
  const [view] = useState('/')

  return <div>
    <header>
      {view !== 'home' && <nav>
        <ul>
          {view !== 'register' && <li><a href="/register" onClick={event => {
            event.preventDefault()
            onRegister()
          }}>Register</a></li>}
          {view !== 'login' && <li><a href="/login" onClick={event => {
            event.preventDefault()
            onLogin()
          }}>Login</a></li>}
        </ul>
      </nav>}
    </header>
  </div>
}