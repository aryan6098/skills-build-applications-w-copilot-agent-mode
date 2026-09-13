import express from 'express'
import { connectDatabase } from './config/database.js'
import { activitiesRouter } from './routes/activities.js'
import { leaderboardRouter } from './routes/leaderboard.js'
import { teamsRouter } from './routes/teams.js'
import { usersRouter } from './routes/users.js'
import { workoutsRouter } from './routes/workouts.js'

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ service: 'octofit-tracker-backend', status: 'ok', apiBaseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(400).json({ error: error.message })
})

async function startServer() {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
    console.log(`OctoFit API base URL: ${apiBaseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error)
  process.exit(1)
})
