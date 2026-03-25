import gifHome from '../assets/1.gif'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('@1app/displayname') !== null

  const handleNovaObservacao = () => {
    navigate(isLoggedIn ? '/newjob' : '/login')
  }

  const handleVerRegistros = () => {
    navigate(isLoggedIn ? '/jobs' : '/login')
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-text">
          <span className="home-eyebrow">Sistema de Auditoria</span>
          <h1 className="home-titulo">
            Job <span className="home-titulo-destaque">Observation</span>
          </h1>
          <p className="home-descricao">
            Registre, acompanhe e analise as observações de jobs de forma
            simples e eficiente.
          </p>
          <div className="home-actions">
            <button className="home-btn-primary" onClick={handleNovaObservacao}>
              Nova Observação
            </button>
            <button className="home-btn-secondary" onClick={handleVerRegistros}>
              Ver Registros →
            </button>
          </div>
        </div>

        <div className="home-gif-wrapper">
          <div className="home-gif-glow" />
          <img src={gifHome} alt="Animação" className="home-gif" />
        </div>
      </div>

      <div className="home-cards">
        <div className="home-card">
          <div className="home-card-icon">📋</div>
          <h3>Registre</h3>
          <p>Crie observações detalhadas com auditores, colaboradores e critérios.</p>
        </div>
        <div className="home-card">
          <div className="home-card-icon">🔍</div>
          <h3>Acompanhe</h3>
          <p>Visualize todos os jobs registrados com filtros e paginação.</p>
        </div>
        <div className="home-card">
          <div className="home-card-icon">📊</div>
          <h3>Analise</h3>
          <p>Identifique padrões e oportunidades de melhoria nos processos.</p>
        </div>
      </div>
    </div>
  )
}

export default Home