const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    document: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: {type: Date, defaul: Date.now() }
})

module.exports = mongoose.model('Client', schema)