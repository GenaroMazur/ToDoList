import {Link} from "react-router-dom"
import "./Header.css"
const logo = require("./../../designs/logo.png")
function Header(){
    return (
        <div className="header">
            <Link to="/"><h1 id="tittle">Task <span className="doneHeader">DONE</span></h1></Link>
            <img src={logo} alt="task done logo" className="logoHeader"/>
            <div className="buttonsHeader">
                <Link to="/login"id="buttonLogin">login</Link>
                <Link to="/register" id="buttonSignIn">sign in</Link>
            </div>
        </div>
    )
}

export default Header