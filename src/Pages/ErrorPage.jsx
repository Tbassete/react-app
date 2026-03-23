function ErrorPage() {
  return (
    <div className="error-wrapper">
      <div className="error-card">
        <div className="error-header">
          <div className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>

          <div className="error-code">
            <span className="digit">4</span>
            <span className="digit delay-1">0</span>
            <span className="digit delay-2">4</span>
          </div>

          <h1 className="error-title">Página não encontrada</h1>
          <p className="error-subtitle">Ops! O endereço que você tentou acessar não existe ou foi removido.</p>
        </div>

        <div className="error-actions">
          <button className="home-btn" onClick={() => window.location.href = '/'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Ir para o início</span>
          </button>

          <button className="back-btn" onClick={() => window.history.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span>Voltar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage;