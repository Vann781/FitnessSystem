import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import foodsRouter from './routes/foods.js'
import logsRouter from './routes/logs.js'
import profileRouter from './routes/profile.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/foods', foodsRouter)
app.use('/api/logs', logsRouter)
app.use('/api/profile', profileRouter)

const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error('MONGODB_URI is not set')
  process.exit(1)
}

mongoose.connect(mongoUri).then(()=>{
  console.log('MongoDB connected')
}).catch((err)=>{
  console.error('MongoDB connection error', err)
  process.exit(1)
})

app.get('/health', (_req, res)=>{
  res.json({ ok: true })
})

app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`)
})

