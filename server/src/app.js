const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const corralesRoutes = require('./routes/corrales.routes')
const nidosRoutes = require('./routes/nidos.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/corrales', corralesRoutes)
app.use('/api/nidos', nidosRoutes)

module.exports = app