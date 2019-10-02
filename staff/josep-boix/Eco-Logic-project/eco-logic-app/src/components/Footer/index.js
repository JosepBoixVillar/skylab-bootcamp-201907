import React from 'react'
import { withRouter } from 'react-router-dom'


function Footer (){

    return <>
        <footer className="footer">
            <div className= "footer__menu--title">
                <p>You can get more information contacting at </p><a>josepboixvillar@gmail.com</a><br/>
                <p>We are also in social media</p>
            </div>
            <ul className="footer__menu">
                <li className="footer__menu--list"><a href="https://www.facebook.com"><img className="icons_social_media" width="50"  src={require('../../img/icon_facebook.png')}alt="Facebook.png"></img></a></li>
                <li className="footer__menu--list"><a href="https://www.linkedin.com"><img className="icons_social_media" width="50" src={require('../../img/icon_linkedin.png')}alt="LinedIn.png"></img></a></li>
                <li className="footer__menu--list"><a href="https://www.twitter.com"><img className="icons_social_media" width="50"  src={require('../../img/icon_twitter.png')}alt="Twitter.png"></img></a></li>
                <li className="footer__menu--list"><a href="https://www.instagram.com"><img className="icons_social_media" width="50"  src={require('../../img/icon_instagram.png')}alt="Instagram.png"></img> </a></li>     
            </ul>
        </footer>  
    </>
}

export default withRouter (Footer);