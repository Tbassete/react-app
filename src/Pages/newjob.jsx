import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function NewJob() {
  const navigate = useNavigate()
  const [criterios, setCriterios] = useState([])
  const [maquinas, setMaquinas] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const [form, setForm] = useState({
    job_observation: '',
    job_auditor: '',
    job_colaborador: '',
    job_vistocolaborador: '',
    job_gaplider: '',
    job_supervisor: '',
    job_turno: '',
    job_maquina: '',
  job_data: new Date().toISOString().split('T')[0], // formato YYYY-MM-DD
  job_timexp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    job_item: '',
  })

  const [respostas, setRespostas] = useState({})

  // estados para autocomplete de auditor
//   const [buscaAuditor, setBuscaAuditor] = useState('')
//   const [sugestoesAuditor, setSugestoesAuditor] = useState([])
//   const [loadingAuditor, setLoadingAuditor] = useState(false)
//   const timerAuditor = useRef(null)

  // estados para autocomplete de colaborador
  const [buscaColaborador, setBuscaColaborador] = useState('')
  const [sugestoesColaborador, setSugestoesColaborador] = useState([])
  const [loadingColaborador, setLoadingColaborador] = useState(false)
  const timerColaborador = useRef(null)
const [produtos, setProdutos] = useState([])
const [searchProduto, setSearchProduto] = useState('')
const [showDropdown, setShowDropdown] = useState(false)
const [loadingProdutos, setLoadingProdutos] = useState(false)
useEffect(() => {
  const nomeAuditor = localStorage.getItem('@1app/displayname') || ''

  fetch('http://172.26.0.180:3001/api/jobs/next-observation')
    .then((res) => res.json())
    .then((data) => setForm((prev) => ({ 
      ...prev, 
      job_observation: data.proximo,
      job_auditor: nomeAuditor
    })))
    .catch(() => setForm((prev) => ({ ...prev, job_auditor: nomeAuditor })))

  fetch('http://172.26.0.180:3001/api/criterios')
    .then((res) => res.json())
    .then((data) => {
      const lista = Array.isArray(data) ? data : []
      setCriterios(lista)
      const inicial = {}
      lista.forEach((c) => {
        inicial[c.SJB_ID] = { resp1: '', desvio: '', acao: '' }
      })
      setRespostas(inicial)
    })
    .catch(() => setCriterios([]))
  fetch('http://172.26.0.180:3001/api/maquinas')
  .then((res) => res.json())
  .then((data) => setMaquinas(Array.isArray(data) ? data : []))
  .catch(() => setMaquinas([]))
  if (searchProduto.length < 1) {
    setProdutos([])
    setShowDropdown(false)
    return
  }
  

  
  // const timeout = setTimeout(() => {
    // setLoadingProdutos(true)
    fetch(`http://172.26.0.180:3001/api/produtos?search=${searchProduto}`)
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.recordset || []
        setProdutos(lista)
        setShowDropdown(true)
        setLoadingProdutos(false)
      })
      .catch((err) => {
        console.error(err)
        // setLoadingProdutos(false)
      })
  // }, 400)
  

    // return () => clearTimeout(timeout)
}, [searchProduto])

  // autocomplete genérico com debounce
  const buscarFuncionarios = (valor, setSugestoes, setLoading, timer) => {
    clearTimeout(timer.current)
    if (valor.length < 2) { setSugestoes([]); return }
    setLoading(true)
    timer.current = setTimeout(() => {
      fetch(`http://172.26.0.180:3001/api/funcionarios?busca=${encodeURIComponent(valor)}`)
        .then((res) => res.json())
        .then((data) => { setSugestoes(Array.isArray(data) ? data : []); setLoading(false) })
        .catch(() => { setSugestoes([]); setLoading(false) })
    }, 350)
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRespostaChange = (id, campo, valor) => {
    setRespostas((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [campo]: valor,
        ...(campo === 'resp1' && valor === 'S' ? { desvio: '', acao: '' } : {}),
      },
    }))
  }

//   const selecionarAuditor = (func) => {
//     setForm((prev) => ({ ...prev, job_auditor: func.nome }))
//     // setBuscaAuditor(`${func.matricula} — ${func.nome}`)
//     // setSugestoesAuditor([])
//   }

  const selecionarColaborador = (func) => {
    setForm((prev) => ({ ...prev, job_colaborador: func.nome }))
    setBuscaColaborador(`${func.matricula} — ${func.nome}`)
    setSugestoesColaborador([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)

    const naoRespondidos = criterios.filter((c) => !respostas[c.SJB_ID]?.resp1)
    if (naoRespondidos.length > 0) {
      setErro(`Responda todos os critérios antes de salvar. Faltam ${naoRespondidos.length} resposta(s).`)
      return
    }

    setEnviando(true)

    try {
      const promises = criterios.map((c) => {
        const r = respostas[c.SJB_ID]
        return fetch('http://172.26.0.180:3001/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            job_observation: parseInt(form.job_observation),
            job_auditor: form.job_auditor,
            job_colaborador: form.job_colaborador,
            job_vistocolaborador: form.job_vistocolaborador,
            job_gaplider: form.job_gaplider,
            job_supervisor: form.job_supervisor,
            job_turno: form.job_turno,
            job_maquina: form.job_maquina,
            job_data: form.job_data,
            job_item: form.job_item,
            job_timexp: form.job_timexp,
            job_criteriojob: c.SJB_ID,
            job_resp1: r.resp1,
            job_desvio: r.desvio || null,
            job_acao: r.acao || null,
          }),
        })
      })

      const resultados = await Promise.all(promises)
      const algumErro = resultados.find((r) => !r.ok)
      if (algumErro) throw new Error()

      setSucesso(true)
      setTimeout(() => navigate('/'), 1800)
    } catch {
      setErro('Erro ao salvar. Verifique os dados e tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  const grupos = criterios.reduce((acc, c) => {
    if (!acc[c.SJB_GRUPO]) acc[c.SJB_GRUPO] = []
    acc[c.SJB_GRUPO].push(c)
    return acc
  }, {})

  const totalRespondidos = criterios.filter((c) => respostas[c.SJB_ID]?.resp1).length

  return (
    <div className="newjob-page">
      <button className="detail-btn-voltar" onClick={() => navigate(-1)}>← Voltar</button>

      <div className="newjob-header">
        <div className="newjob-header-accent" />
        <div>
          <h1 className="newjob-titulo">Nova Job Observation</h1>
          <p className="newjob-subtitulo">
            Preencha os dados e avalie todos os {criterios.length} critérios
          </p>
        </div>
      </div>

      {sucesso && <div className="newjob-sucesso">✓ Job criada com sucesso! Redirecionando...</div>}
      {erro && <div className="newjob-erro"><span>⚠</span> {erro}</div>}

      <form onSubmit={handleSubmit} className="newjob-form">

        {/* Dados Gerais */}
        <div className="newjob-secao">
          <p className="newjob-secao-titulo">Dados Gerais</p>
          <div className="newjob-grid">

            {/* Observation — somente leitura */}
            <div className="newjob-field">
              <label className="newjob-label">Nº da Observation</label>
              <input
                className="newjob-input newjob-input-readonly"
                type="number"
                value={form.job_observation}
                readOnly
              />
            </div>

<div className="newjob-field">
  <label className="newjob-label">Auditor</label>
  <input
    className="newjob-input newjob-input-readonly"
    type="text"
    value={form.job_auditor}
    readOnly
  />
</div>

<div className="newjob-field">
  <label className="newjob-label">Data</label>
  <input
    className="newjob-input"
    type="date"
    name="job_data"
    value={form.job_data}
    onChange={handleFormChange}
    readOnly
  />
</div>

<div className="newjob-field">
  <label className="newjob-label">Horário</label>
  <input
    className="newjob-input"
    type="text"
    name="job_timexp"
    value={form.job_timexp}
    onChange={handleFormChange}
    readOnly
    placeholder="Ex: 08:00"
  />
</div>

            {/* Autocomplete Colaborador */}
            <div className="newjob-field">
              <label className="newjob-label">Colaborador</label>
              <div className="newjob-autocomplete">
                <input
                  className="newjob-input"
                  type="text"
                  placeholder="Digite nome ou matrícula"
                  value={buscaColaborador}
                  onChange={(e) => {
                    setBuscaColaborador(e.target.value)
                    setForm((prev) => ({ ...prev, job_colaborador: '' }))
                    buscarFuncionarios(e.target.value, setSugestoesColaborador, setLoadingColaborador, timerColaborador)
                  }}
                  required
                />
                {loadingColaborador && <div className="newjob-autocomplete-loading">Buscando...</div>}
                {sugestoesColaborador.length > 0 && (
                  <div className="newjob-autocomplete-lista">
                    {sugestoesColaborador.map((f) => (
                      <div
                        key={f.matricula}
                        className="newjob-autocomplete-item"
                        onClick={() => selecionarColaborador(f)}
                      >
                        <span className="newjob-autocomplete-mat">{f.matricula}</span>
                        <span className="newjob-autocomplete-nome">{f.nome}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Supervisor fixo */}
            <div className="newjob-field">
              <label className="newjob-label">Supervisor</label>
              <select
                className="newjob-input"
                name="job_supervisor"
                value={form.job_supervisor}
                onChange={handleFormChange}
              >
                <option value="">Adriano</option>
                <option value="Silas">Silas</option>
                <option value="Henrique">Henrique</option>
              </select>
            </div>

            <div className="newjob-field">
              <label className="newjob-label">Gap Líder</label>
              <input
                className="newjob-input"
                type="text"
                name="job_gaplider"
                value={form.job_gaplider}
                onChange={handleFormChange}
                placeholder="Nome do gap líder"
              />
            </div>

            {/* Máquinas do Protheus */}
            <div className="newjob-field">
              <label className="newjob-label">Máquina</label>
              <select
                className="newjob-input"
                name="job_maquina"
                value={form.job_maquina}
                onChange={handleFormChange}
              >
                <option value="">Selecione</option>
                {maquinas.map((m) => (
                  <option key={m.codigo} value={m.codigo}>
                    {m.codigo} — {m.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="newjob-field">
              <label className="newjob-label">Turno</label>
              <select
                className="newjob-input"
                name="job_turno"
                value={form.job_turno}
                onChange={handleFormChange}
              >
                <option value="">Selecione</option>
                <option value="1°T">1°T</option>
                <option value="2°T">2°T</option>
                <option value="3°T">3°T</option>
              </select>
            </div>




<div className="newjob-field" style={{ position: 'relative' }}>
  <label className="newjob-label">Item</label>
  <input
    className="newjob-input"
    type="text"
    placeholder="Digite o código da peça..."
    value={searchProduto}
    onChange={(e) => {
      setSearchProduto(e.target.value)
      // limpa o valor do form se o usuário apagar o campo
      if (!e.target.value) {
        setForm((prev) => ({ ...prev, job_item: '' }))
      }
    }}
    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
    autoComplete="off"
  />

  {loadingProdutos && (
    <div className="produto-dropdown-loading">Buscando...</div>
  )}

  {showDropdown && produtos.length > 0 && (
    <ul className="produto-dropdown">
      {produtos.map((p) => (
        <li
          key={p.B1_COD}
          className="produto-dropdown-item"
          onMouseDown={() => {
            setForm((prev) => ({ ...prev, job_item: p.B1_COD }))
            setSearchProduto(p.B1_COD)
            setShowDropdown(false)
          }}
        >
          {p.B1_COD}
        </li>
      ))}
    </ul>
  )}

  {showDropdown && produtos.length === 0 && !loadingProdutos && (
    <div className="produto-dropdown-empty">Nenhum item encontrado</div>
  )}
</div>
            <div className="newjob-field">
              <label className="newjob-label">Visto Colaborador</label>
              <select
                className="newjob-input"
                name="job_vistocolaborador"
                value={form.job_vistocolaborador}
                onChange={handleFormChange}
              >

                <option value="S">Sim</option>

              </select>
            </div>

          </div>
        </div>

        {/* Critérios */}
        <div className="newjob-secao">
          <div className="newjob-criterios-header">
            <p className="newjob-secao-titulo" style={{ margin: 0 }}>Critérios de Avaliação</p>
            <span className="newjob-progresso">
              {totalRespondidos}/{criterios.length} respondidos
            </span>
          </div>

          {Object.entries(grupos).map(([grupo, itens]) => (
            <div key={grupo} className="newjob-grupo">
              <p className="newjob-grupo-titulo">{grupo}</p>
              {itens.map((c) => {
                const r = respostas[c.SJB_ID] || {}
                const naoConforme = r.resp1 === 'N'
                return (
                  <div
                    key={c.SJB_ID}
                    className={`newjob-criterio-card ${naoConforme ? 'newjob-criterio-nao-conforme' : ''}`}
                  >
                    <div className="newjob-criterio-topo">
                      <p className="newjob-criterio-desc">{c.SJB_DESCRICAO}</p>
                      <div className="newjob-criterio-botoes">
                        <button
                          type="button"
                          className={`newjob-resp-btn newjob-resp-sim ${r.resp1 === 'S' ? 'ativo' : ''}`}
                          onClick={() => handleRespostaChange(c.SJB_ID, 'resp1', 'S')}
                        >
                          ✓ Conforme
                        </button>
                        <button
                          type="button"
                          className={`newjob-resp-btn newjob-resp-nao ${r.resp1 === 'N' ? 'ativo' : ''}`}
                          onClick={() => handleRespostaChange(c.SJB_ID, 'resp1', 'N')}
                        >
                          ✗ Não Conforme
                        </button>
                      </div>
                    </div>

                    {naoConforme && (
                      <div className="newjob-nc-campos">
                        <div className="newjob-field">
                          <label className="newjob-label">Desvio identificado</label>
                          <textarea
                            className="newjob-input newjob-textarea"
                            value={r.desvio}
                            onChange={(e) => handleRespostaChange(c.SJB_ID, 'desvio', e.target.value)}
                            placeholder="Descreva o desvio encontrado"
                            required
                            rows={2}
                          />
                        </div>
                        <div className="newjob-field">
                          <label className="newjob-label">Ação corretiva</label>
                          <textarea
                            className="newjob-input newjob-textarea"
                            value={r.acao}
                            onChange={(e) => handleRespostaChange(c.SJB_ID, 'acao', e.target.value)}
                            placeholder="Descreva a ação a ser tomada"
                            required
                            rows={2}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <button type="submit" className="newjob-btn-submit" disabled={enviando}>
          {enviando ? 'Salvando...' : `Salvar Job Observation (${criterios.length} critérios)`}
        </button>

      </form>
    </div>
  )
}

export default NewJob