import { Router } from 'express'
import { Team } from '../models/Team.js'

export const teamsRouter = Router()

teamsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ totalPoints: -1 }))
  } catch (error) {
    next(error)
  }
})

teamsRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body))
  } catch (error) {
    next(error)
  }
})
