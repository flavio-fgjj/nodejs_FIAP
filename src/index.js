require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./config/config')
const notFound = require('./middleware/mw-notFound')

// routes
const routeClient = require('./routes/route-client')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

mongoose.connect(config.dbPath, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})

app.use('/client', routeClient)
app.use(notFound)

app.listen(process.env.PORT || 3000, () => console.log(`Servidor on-line! Porta: ${process.env.PORT || 3000}`))