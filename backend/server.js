import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }


app.use(express.json())

app.use('/api', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }



app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log(`Server is up and running on port ${PORT}`)
})