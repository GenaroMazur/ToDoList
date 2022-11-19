import "./Login.css"
import {useRef, useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
function Login(){
    let direction = useLocation()
    const [link, letLink] = useState(direction.pathname)

    useEffect(()=>{

        if(link === "/login"){
            showLogin.current.classList.add("ocultar")
            registerForm.current.classList.add("ocultar")
            showRegister.current.classList.remove("ocultar")
            loginForm.current.classList.remove("ocultar")
        } else if(link === "/register"){
            showLogin.current.classList.remove("ocultar")
            registerForm.current.classList.remove("ocultar")
            showRegister.current.classList.add("ocultar")
            loginForm.current.classList.add("ocultar")
        }

    },[link])

    const loginForm = useRef()
    const registerForm = useRef()
    const showLogin = useRef()
    const showRegister = useRef()

    const cambiar = ()=>{
        if(link === "/login"){
            letLink("/register")
        }else{
            letLink("/login")
        }
    }
    return(
        <div className="loginRegister">
            <div ref={showLogin} className="buttonConten">
                <button  className="showLogin unFocusButton" onClick={cambiar}>Login</button>
            </div>
            <div ref={loginForm} className="loginForm">
                <form action="http//localhost:3001/auth/login" method="post">
                    <label htmlFor="email">Email</label>
                    <div className="dangerLogEmail"></div>
                    <input type="text" placeholder="email" name="email" id="email"/>
                    <label htmlFor="password">Password</label>
                    <div className="dangerLogPass"></div>
                    <input type="password" placeholder="password" name="password" id="password"/>
                    <input type="submit" value="Login" className="buttonForm"/>
                </form>
            </div>
            <div ref={showRegister} className="buttonConten">
                <button  className="showRegister unFocusButton" onClick={cambiar}>Register</button>
            </div>
            <div ref={registerForm} className="registerForm ">
                <form action="http//localhost:3001/auth/register" method="post">
                    <label htmlFor="username">Username</label>
                    <div className="dangerRegUser"></div>
                    <input type="text" placeholder="Joe" name="username" id="username"/>
                    <label htmlFor="regEmail">Email</label>
                    <div className="dangerRegEmail"></div>
                    <input type="text" placeholder="example@email.com" name="email" id="regEmail"/>
                    <label htmlFor="regPassword">Password</label>
                    <div className="dangerRegPass"></div>
                    <input type="password" placeholder="pass1234" name="password" id="regPassword"/>
                    <input type="submit" value="Register" className="buttonForm"/>
                </form>
            </div>
        </div>
    )
}

export default Login