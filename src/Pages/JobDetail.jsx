import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const statusColor = (resp) => {
  const v = resp?.trim()
  if (v === 'S') return '#22c55e'
  if (v === 'N') return '#E62537'
  return '#94a3b8'
}

const statusLabel = (resp) => {
  const v = resp?.trim()
  if (v === 'S') return 'Conforme'
  if (v === 'N') return 'Não Conforme'
  return 'N/A'
}

function JobDetail() {
  const { obsId } = useParams()
  const navigate = useNavigate()
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch('http://172.26.0.168:3001/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.recordset || []
        const filtrado = lista.filter(
          (job) => String(job.JOB_OBSERVATION) === String(obsId)
        )
        setItens(filtrado)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setErro('Erro ao carregar os dados.')
        setLoading(false)
      })
  }, [obsId])

  const primeiro = itens[0] || {}

  return (
    <div className="detail-page">
      <button className="detail-btn-voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      {loading && (
        <div className="detail-centrado">
          <div className="detail-spinner" />
          <p className="detail-loading-text">Carregando...</p>
        </div>
      )}

      {erro && <p style={{ color: '#fca5a5' }}>{erro}</p>}

      {!loading && !erro && (
        <>
          <div className="detail-header">
            <div className="detail-header-accent" />
            <div>
              <h1 className="detail-titulo">Observação #{obsId}</h1>
              <p className="detail-subtitulo">
                {new Date(primeiro.JOB_DATA).toLocaleDateString('pt-BR')} •{' '}
                {itens.length} {itens.length === 1 ? 'critério avaliado' : 'critérios avaliados'}
              </p>
            </div>
          </div>

<div className="detail-secao">
  <p className="detail-secao-titulo">Dados Gerais</p>
  <div className="detail-info-grid">
    <InfoItem label="Auditor" value={primeiro.JOB_AUDITOR} />
    <InfoItem label="Colaborador" value={primeiro.JOB_COLABORADOR} />
    <InfoItem label="Supervisor" value={primeiro.JOB_SUPERVISOR} />
    <InfoItem label="Gap Líder" value={primeiro.JOB_GAPLIDER} />
    <InfoItem label="Máquina" value={primeiro.JOB_MAQUINA} />
    <InfoItem label="Turno" value={primeiro.JOB_TURNO} />
    <InfoItem label="Horário" value={primeiro.JOB_TIMEXP} />
    <InfoItem label="Item" value={primeiro.JOB_ITEM} />
  </div>

  {primeiro.JOB_VISTOCOLABORADOR && (
    <div className="detail-assinatura-wrapper">
      <p className="detail-assinatura-label">Visto Colaborador</p>
      <img
        src={primeiro.JOB_VISTOCOLABORADOR}
        alt="Assinatura do colaborador"
        className="detail-assinatura-img"
      />
    </div>
  )}
</div>

          <div className="detail-secao">
            <p className="detail-secao-titulo">Critérios Avaliados</p>
            {itens.map((job) => (
              <div key={job.JOB_ID} className="detail-criterio-card">
                <div className="detail-criterio-topo">
                  <div>
                <span className="detail-criterio-grupo">{job.CRITERIO_GRUPO}</span>
                    <p className="detail-criterio-desc">{job.CRITERIO_DESCRICAO}</p>
                  </div>
                  <span
                    className="detail-status-badge"
                    style={{
                      backgroundColor: statusColor(job.JOB_RESP1) + '22',
                      color: statusColor(job.JOB_RESP1),
                      borderColor: statusColor(job.JOB_RESP1) + '55',
                    }}
                  >
                    {statusLabel(job.JOB_RESP1)}
                  </span>
                </div>

                {job.JOB_DESVIO && (
                  <div className="detail-desvio-box">
                    <span className="detail-desvio-label">⚠ Desvio</span>
                    <p className="detail-desvio-text">{job.JOB_DESVIO}</p>
                  </div>
                )}

                {job.JOB_ACAO && (
                  <div className="detail-acao-box">
                    <span className="detail-acao-label">✓ Ação</span>
                    <p className="detail-acao-text">{job.JOB_ACAO}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="detail-info-item">
      <span className="detail-info-label">{label}</span>
      <span className="detail-info-value">{value || '—'}</span>
    </div>
  )
}

export default JobDetail