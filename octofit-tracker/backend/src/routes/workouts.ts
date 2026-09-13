import { Router } from 'express'
import { Workout } from '../models/Workout.js'

export const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
})

workoutsRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body))
  } catch (error) {
    next(error)
  }
})
