import { Router } from 'express'
import { LeaderboardEntry } from '../models/LeaderboardEntry.js'

export const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ points: -1, rank: 1 }))
  } catch (error) {
    next(error)
  }
})

leaderboardRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await LeaderboardEntry.create(request.body))
  } catch (error) {
    next(error)
  }
})
