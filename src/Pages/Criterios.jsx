import React, { useEffect, useState } from 'react';
// import './Criterios.css';

const API = 'http://172.26.0.180:3001/api/criterios';

export default function Criterios() {
  const [criterios, setCriterios] = useState([]);
  const [form, setForm] = useState({ sjb_descricao: '', sjb_grupo: '', sjb_sequencia: '' });
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCriterios = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCriterios(data);
  };

  useEffect(() => {
    fetchCriterios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        sjb_sequencia: form.sjb_sequencia ? parseInt(form.sjb_sequencia) : null,
      };

      if (editando) {
        await fetch(`${API}/${editando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditando(null);
      } else {
        await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setForm({ sjb_descricao: '', sjb_grupo: '', sjb_sequencia: '' });
      fetchCriterios();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
};

  const handleEditar = (criterio) => {
    setEditando(criterio.SJB_ID);
    setForm({
      sjb_descricao: criterio.SJB_DESCRICAO,
      sjb_grupo: criterio.SJB_GRUPO,
      sjb_sequencia: criterio.SJB_SEQUENCIA,
    });
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Deseja remover este critério?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchCriterios();
  };

  const handleCancelar = () => {
    setEditando(null);
    setForm({ sjb_descricao: '', sjb_grupo: '', sjb_sequencia: '' });
  };

  return (
    <div className="criterios-container">
      <h2>Critérios</h2>

      <form className="criterios-form" onSubmit={handleSubmit}>
        <input
          name="sjb_descricao"
          placeholder="Descrição"
          value={form.sjb_descricao}
          onChange={handleChange}
          required
        />
        <input
          name="sjb_grupo"
          placeholder="Grupo"
          value={form.sjb_grupo}
          onChange={handleChange}
        />
        <input
          name="sjb_sequencia"
          placeholder="Sequência"
          type="number"
          value={form.sjb_sequencia}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {editando ? 'Salvar edição' : 'Adicionar'}
        </button>
        {editando && (
          <button className="btn btn-secondary" type="button" onClick={handleCancelar}>
            Cancelar
          </button>
        )}
      </form>

      <table className="criterios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Grupo</th>
            <th>Sequência</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {criterios.map((c) => (
            <tr key={c.SJB_ID}>
              <td>{c.SJB_ID}</td>
              <td>{c.SJB_DESCRICAO}</td>
              <td>{c.SJB_GRUPO}</td>
              <td>{c.SJB_SEQUENCIA}</td>
              <td className="actions">
                <button className="btn btn-edit" onClick={() => handleEditar(c)}>
                  Editar
                </button>
                <button className="btn btn-delete" onClick={() => handleDeletar(c.SJB_ID)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}