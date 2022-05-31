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

    return res.status(200).send({
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

route.delete('/:id', check, (req, res) => {
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