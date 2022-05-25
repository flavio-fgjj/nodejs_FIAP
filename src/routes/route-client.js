const express = require('express')
const bcrypt = require('bcrypt')

const Client = require('../model/client')

const createToken = require('../utils/create-token')
const check = require('../middleware/mw-checkToken')

const config = require('../config/config')

const route = express.Router()

route.get('/', (req,res) => {
  Client.find((err,result) => {
    if(err) {
      return result
        .status(500)
        .send({
          output: `Err -> ${err}`
        })
    }

    return result.status(200).send({
      output: 'OK',
      payload: result
    })
  })
})

route.post('/', (req,res) => {
  bcrypt.hash(req.body.password, config.salt, (err,result) => {
    if(err) {
      return res.status(500).send({
        output: `can't generate password -> ${err}`
      })
    }

    req.body.password = result
    
    const data = new Client(req.body)
  
    data
      .save()
      .then((result) => {
        res.status(201).send({
          output: 'Cadastro efetuado', 
          payload: result
        })
      })
      .catch((err) => {
        res.status(500).send({
          output: `Erro ao cadastrar -> ${err}`
        })
      })
  })
})

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

route.put('/:id', check, (req, res) => {
  Client.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .send({ output: `Err -> ${err}` })
      }

      if (!data) {
        return res
          .status(400)
          .send({ output: `Can't update -> ${err}` })
      }
      return res.status(202).send({ output: "Updated", payload: data });
    }
  );
})

route.delete('/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ output: `Err -> ${err}` })
    }
    res.status(204).send({});
  })
})

module.exports = route