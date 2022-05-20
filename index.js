require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

const urldb = ''

mongoose.connect(urldb, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    document: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: {type: Date, default:now }
})

const Client = mongoose.model('Client', schema)

app.get('/', (req,res) => {
    Client.find((err,result) => {
        if(err) {
            return result.status(500)
                .send(output:`Err -> ${err}`)
        }

        return result.status(200).send({
            output: 'OK',
            payload: result
        })
    })
})

app.get('/', (req,res,next) => {
    res.status(200).send({
        output: 'Hello World!'
    })
})

app.post('/', (req, res) => {
    res.status(201).send({
        output: req.body
    })
})

app.put('/:id', (req, res) => {
    res.status(202).send({
        id: req.params.id,
        body: req.body
    })
})

app.delete('/:id', (req, res) => {
    res.status(204).send({})
})

app.use((req,res) => {
    res.type("application/json")
    res.send(404).send("404 - Not Found")
})

app.listen(process.env.PORT || 3000, () => console.log('API rodando na porta 3001'))
