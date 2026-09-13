import { NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit <em>Tracker</em></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activity</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Athletes</NavLink>
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer>Octofit Tracker <span>·</span> Train with intent</footer>
    </div>
  )
}

function Home() {
  return (
    <section className="home-view">
      <p className="eyebrow">Your training room</p>
      <h1>Small steps.<br /><span>Strong momentum.</span></h1>
      <p className="home-copy">Log the work, find your people, and keep the next session within reach.</p>
      <div className="home-links"><NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">→</span></NavLink><NavLink className="text-action" to="/workouts">Browse workouts</NavLink></div>
      <div className="home-ribbon"><span>01</span><strong>Build a rhythm</strong><span>02</span><strong>Find your crew</strong><span>03</span><strong>Keep going</strong></div>
    </section>
  )
}

export default App
