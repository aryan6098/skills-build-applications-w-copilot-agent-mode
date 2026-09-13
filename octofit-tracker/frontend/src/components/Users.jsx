import { useEffect, useState } from 'react'
import { fetchCollection, getApiEndpoint } from '../api.js'

export default function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : getApiEndpoint('users')
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setUsers).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [endpoint])

  if (status === 'loading') return <p className="status-message">Loading athletes...</p>
  if (status === 'error') return <p className="status-message error-message">{error}</p>

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Athletes</h1></div><span className="count-badge">{users.length} members</span></div>{users.length === 0 ? <p className="empty-state">No athletes registered yet.</p> : <div className="data-grid">{users.map((user) => <article className="data-card profile-card" key={user._id || user.username}><div className="avatar">{(user.displayName || user.username || '?').charAt(0).toUpperCase()}</div><div><h2>{user.displayName || user.username}</h2><p>@{user.username} · {user.email}</p></div></article>)}</div>}</section>
}