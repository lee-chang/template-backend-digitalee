import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/http.response.util'

export const ErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const status = error.status || 500
    const message = error.message || 'Internal Server Error'

    res.status(status).json({ message: message, status: status })
  } else {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error', status: 500 })
  }
}
