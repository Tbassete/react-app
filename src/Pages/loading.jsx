function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loading-card">
        <div className="loading-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>

        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring delay-1"></div>
          <div className="spinner-ring delay-2"></div>
        </div>

        <h1 className="loading-title">Carregando</h1>
        <p className="loading-subtitle">Aguarde um momento...</p>

        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot delay-1"></span>
          <span className="dot delay-2"></span>
        </div>
      </div>
    </div>
  )
}

export default Loading;