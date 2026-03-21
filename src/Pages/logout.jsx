import { useNavigate } from "react-router-dom"

function Logout() {

    const navigate = useNavigate()
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  const fnCancel = (event)=>{
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className="logout-wrapper">
      <div className="logout-card">
        <div className="logout-header">
          <div className="logout-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </div>
          <h1 className="logout-title">Sair da conta</h1>
          <p className="logout-subtitle">Tem certeza que deseja encerrar sua sessão?</p>
        </div>

        <div className="logout-actions">
          <button className="cancel-btn" onClick={(event)=>fnCancel(event)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span>Cancelar</span>
          </button>

          <button className="logout-btn" onClick={(event)=>handleLogout(event)}>
            <span>Sair</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout;