import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ITEMS_PER_PAGE = 10

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://172.26.0.180:3001/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.recordset || []
        setJobs(lista)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setErro('Erro ao carregar os dados.')
        setLoading(false)
      })
  }, [])

  const grupos = jobs.reduce((acc, job) => {
    const obs = job.JOB_OBSERVATION
    if (!acc[obs]) acc[obs] = []
    acc[obs].push(job)
    return acc
  }, {})

  const gruposOrdenados = Object.entries(grupos).sort((a, b) => b[0] - a[0])

  const totalPages = Math.ceil(gruposOrdenados.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const gruposPaginados = gruposOrdenados.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPaginationRange = () => {
    const delta = 2
    const range = []
    const left = Math.max(1, currentPage - delta)
    const right = Math.min(totalPages, currentPage + delta)

    if (left > 1) {
      range.push(1)
      if (left > 2) range.push('...')
    }

    for (let i = left; i <= right; i++) range.push(i)

    if (right < totalPages) {
      if (right < totalPages - 1) range.push('...')
      range.push(totalPages)
    }

    return range
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="jobs-header-accent" />
        <div>
          <h1 className="jobs-titulo">Job Observations</h1>
          <p className="jobs-subtitulo">
            {gruposOrdenados.length} observações encontradas
            {totalPages > 1 && ` — página ${currentPage} de ${totalPages}`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="jobs-centrado">
          <div className="jobs-spinner" />
          <p className="jobs-loading-text">Carregando jobs...</p>
        </div>
      )}

      {erro && (
        <div className="jobs-erro-box">
          <span className="jobs-erro-icone">⚠</span>
          <p className="jobs-erro-text">{erro}</p>
        </div>
      )}

      {!loading && !erro && (
        <>
          <div className="jobs-grid">
            {gruposPaginados.map(([obsId, itens], index) => {
              const primeiro = itens[0]
              return (
                <div
                  key={obsId}
                  className="job-card"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="job-card-top">
                    <div className="job-id-badge">Obs #{obsId}</div>
                    <span className="job-count-badge">
                      {itens.length} {itens.length === 1 ? 'critério' : 'critérios'}
                    </span>
                  </div>

                  <div className="job-info-grid">
                    <InfoItem label="Auditor" value={primeiro.JOB_AUDITOR} />
                    <InfoItem label="Colaborador" value={primeiro.JOB_COLABORADOR} />
                    <InfoItem label="Máquina" value={primeiro.JOB_MAQUINA} />
                    <InfoItem label="Turno" value={primeiro.JOB_TURNO} />
                    <InfoItem
                      label="Data"
                      value={new Date(primeiro.JOB_DATA).toLocaleDateString('pt-BR')}
                    />
                    <InfoItem label="Supervisor" value={primeiro.JOB_SUPERVISOR} />
                    <InfoItem label="Gap Líder" value={primeiro.JOB_GAPLIDER} />
                    <InfoItem label="Horário" value={primeiro.JOB_TIMEXP} />
                  </div>

                  <div className="job-card-footer">
                    <button
                      className="job-btn-detalhe"
                      onClick={() => navigate(`/jobs/${obsId}`)}
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <button
                className="pagination-btn pagination-nav"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>

              {getPaginationRange().map((item, index) =>
                item === '...' ? (
                  <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    className={`pagination-btn ${currentPage === item ? 'pagination-btn-active' : ''}`}
                    onClick={() => handlePageChange(item)}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                className="pagination-btn pagination-nav"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="job-info-item">
      <span className="job-info-label">{label}</span>
      <span className="job-info-value">{value || '—'}</span>
    </div>
  )
}

export default Jobs