import React from 'react'
import { withRouter } from 'react-router-dom'

function Landing () {
    // const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'app' )

    return <>
        <main className="main">
            <section className="main__welcome">
                <figure >
                    <p className="main__welcome--texto">Welcome to Eco-Logic, be free to xplore our app </p>
                    <img className="main__welcome--img" src={require('../../img/ecommerce-welcome.png')} width="300" alt="foto random"></img></figure>
                    <p className="main__welcome--text">We are proud to see you here! Let us present you how we could improve our enviroment...</p>
            </section>
        </main>
    </>
}
export default withRouter(Landing)