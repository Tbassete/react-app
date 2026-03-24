import { useNavigate } from "react-router-dom"
import Loading from "./loading"
import { useState } from 'react'
function Login() {
const navigate = useNavigate()
const [Loading, setLoading] = useState(false)
const fnConfirmar = async (event) => {
    event.preventDefault()

    const form = event.target.form ?? event.target.closest('form')
    const username = form.elements['username'].value
    const password = form.elements['password'].value

    const urirest = `http://172.26.50.9:8096/rest/users?username=${username.toUpperCase()}`

    const credentials = btoa(`${username}:${password}`)

    setLoading(true)

    try {
        const response = await fetch(urirest, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        const jsonlogin = await response.json()
        console.log(jsonlogin)

        if(jsonlogin.resources.length === 1){
            localStorage.setItem("@1app/displayname", jsonlogin.resources[0].displayName)
            navigate('/')
            window.location.reload()
            return
        }
        return
    } catch(err) {
        console.log("errou: =>", err)
        return
    } 
}

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </div>
          <h1 className="login-title">Bem-vindo</h1>
          <p className="login-subtitle">Entre na sua conta</p>
        </div>

        <form className="login-form">
          <div className="input-group">
            <label className="input-label" htmlFor="email">Login</label>
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <input
                type="text"
                id="email"
                className="input-field"
                name="username"
                placeholder="seu login no protheus"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z"/>
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="forgot-wrapper">
            <a href="/" className="forgot-link">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="login-btn" onClick={(event => fnConfirmar(event))}>
            <span>Entrar</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;