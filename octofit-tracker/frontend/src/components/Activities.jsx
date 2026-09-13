import { useEffect, useState } from 'react'
import { fetchCollection, formatDate, getApiEndpoint } from '../api.js'

export default function Activities() {
  const endpoint = getApiEndpoint('activities')
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection(endpoint).then(setActivities).then(() => setStatus('ready')).catch((requestError) => {
      setError(requestError.message)
      setStatus('error')
    })
  }, [endpoint])

  if (status === 'loading') return <p className="status-message">Loading activities...</p>
  if (status === 'error') return <p className="status-message error-message">{error}</p>

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Movement log</p><h1>Recent activity</h1></div><span className="count-badge">{activities.length} sessions</span></div>
      {activities.length === 0 ? <p className="empty-state">No activities logged yet.</p> : <div className="data-grid">{activities.map((activity) => <article className="data-card" key={activity._id || `${activity.username}-${activity.completedAt}`}><div className="card-topline"><span className="tag">{activity.type}</span><span>{formatDate(activity.completedAt)}</span></div><h2>{activity.username}</h2><p>{activity.durationMinutes} minutes · {activity.calories} calories</p></article>)}</div>}
    </section>
  )
}