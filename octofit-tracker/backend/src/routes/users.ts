import { Router } from 'express'
import { User } from '../models/User.js'

export const usersRouter = Router()

usersRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }))
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    next(error)
  }
})
