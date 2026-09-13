import { Router } from 'express'
import { Activity } from '../models/Activity.js'

export const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().sort({ completedAt: -1 }))
  } catch (error) {
    next(error)
  }
})

activitiesRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body))
  } catch (error) {
    next(error)
  }
})
