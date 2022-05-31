const express = require('express')
const bcrypt = require('bcrypt')

const Client = require('../model/client')

const config = require('../config/config')

const route = express.Router()

route.post('/login', (req, res) => {
    Client.findOne({
      username: req.body.username, 
    }, (err,result) => {
      if(err) {
        return res.status(500).send({ output: `Found error -> ${err}`})
      }
  
      if(!result) {
        return res.status(400).send({ output: `User not found`})
      }
  
      bcrypt.compare(req.body.password, result.password, (err, same) => {
        if(err) {
          return res.status(500).send({ output: `Can't process your request -> ${err}`})
        }
        
        if(!same) {
          return res.status(400).send({ output: `Invalid credentials`})
        }
  
        const newToken = createToken(result._id, result.username, result.email)
  
        return res.status(200).send({ output: 'User authenticated', token: newToken })
      })
    })
  })