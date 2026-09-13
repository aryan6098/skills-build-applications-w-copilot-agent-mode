import { useEffect, useState } from 'react'
import { fetchCollection, getApiEndpoint } from '../api.js'

export default function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : getApiEndpoint('workouts')
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setWorkouts).then(() => setStatus('ready')).catch((requestError) => { setError(requestError.message); setStatus('error') })
  }, [endpoint])

  if (status === 'loading') return <p className="status-message">Loading workouts...</p>
  if (status === 'error') return <p className="status-message error-message">{error}</p>

  return <section className="page-section"><div className="section-heading"><div><p className="eyebrow">Built for progress</p><h1>Workout library</h1></div><span className="count-badge">{workouts.length} plans</span></div>{workouts.length === 0 ? <p className="empty-state">No workouts published yet.</p> : <div className="data-grid">{workouts.map((workout) => <article className="data-card" key={workout._id || workout.title}><div className="card-topline"><span className="tag">{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p className="capitalize">{workout.difficulty} · {workout.exercises?.length || 0} exercises</p></article>)}</div>}</section>
}