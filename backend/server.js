require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const connectDB = require('./config/db')
const contactRoutes = require('./routes/contactRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()
const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { success: false, message: 'Too many requests. Try again later.' } }))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Kriti API is running', timestamp: new Date().toISOString() }))
app.use('/api/contact', rateLimit({ windowMs: 60 * 60 * 1000, max: 5, message: { success: false, message: 'Too many submissions. Try again later.' } }), contactRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Kriti Backend running on port ${PORT} [${process.env.NODE_ENV}]`) })
module.exports = app
