import express, { Express } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import router from './routes'
import helmet from 'helmet'

import { connect as connectMongoDB } from './config/mongoose.config'
import { ErrorMiddleware } from './core/middleware/errorHandler.middleware'
import { corsMiddleware } from './core/middleware/cors.middleware'
import setupInitial from './config/setupInit.config'

const app: Express = express()

// * Middlewares
app.use(helmet())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.disable('x-powered-by')

// * CORS
app.use(corsMiddleware())

// * Content Type Config
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))

// * Routes
app.use(router)

// * Error Handler
app.use(ErrorMiddleware)

connectMongoDB()
// Primero se conecta a la base de datos y luego se ejecuta el setupInitial
setupInitial()

export default app
