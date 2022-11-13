import "./Header.css"
const logo = require("./../../designs/logo.png")

function Header(){
    return (
        <div className="header">
            <h1 id="tittle">Task <span className="doneHeader">DONE</span></h1>
            <img src={logo} alt="task done logo" className="logoHeader"/>
            <div className="buttonsHeader">
                <button id="buttonLogin">login</button>
                <button id="buttonSignIn">sign in</button>
            </div>
        </div>
    )
}

export default Header