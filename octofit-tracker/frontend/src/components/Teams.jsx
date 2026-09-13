import { useEffect, useState } from 'react'
import { fetchCollection, getApiEndpoint } from '../api.js'

export default function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : getApiEndpoint('teams')
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setTeams).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [endpoint])

  if (status === 'loading') return <p className="status-message">Loading teams...</p>
  if (status === 'error') return <p className="status-message error-message">{error}</p>

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Train together</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>{teams.length === 0 ? <p className="empty-state">No teams created yet.</p> : <div className="data-grid">{teams.map((team) => <article className="data-card" key={team._id || team.name}><div className="card-topline"><span className="tag">{team.memberUsernames?.length || 0} members</span><span>{team.totalPoints || 0} pts</span></div><h2>{team.name}</h2><p>{team.description}</p></article>)}</div>}</section>
}