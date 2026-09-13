import { useEffect, useState } from 'react'
import { fetchCollection, getApiEndpoint } from '../api.js'

export default function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : getApiEndpoint('leaderboard')
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setEntries).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [endpoint])

  if (status === 'loading') return <p className="status-message">Loading leaderboard...</p>
  if (status === 'error') return <p className="status-message error-message">{error}</p>

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Keep score</p><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} ranked</span></div>{entries.length === 0 ? <p className="empty-state">No leaderboard entries yet.</p> : <div className="leaderboard-list">{entries.map((entry, index) => <article className="leader-row" key={entry._id || `${entry.username}-${entry.rank}`}><strong className="rank">{entry.rank || index + 1}</strong><div><h2>{entry.username}</h2><p>{entry.teamName}</p></div><strong className="points">{entry.points} pts</strong></article>)}</div>}</section>
}