import mongoose from 'mongoose'
import { ENV_CONFIG } from './env.config'

// Connect to MongoDB using typescript

mongoose.set('strictQuery', false)

export const connect = async () => {
  try {
    // Promise que resuelve después de 10 segundos
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Connection to MongoDB timed out'))
      }, 10000) // 10 segundos
    })

    const connectPromise = await mongoose.connect(`${ENV_CONFIG.MONGODB_URI}`)

    // Race entre el tiempo de espera y la conexión a MongoDB
    await Promise.race([timeoutPromise, connectPromise])

    console.log(`MongoDB Connected: ${mongoose.connection.host}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
