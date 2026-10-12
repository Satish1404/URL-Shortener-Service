const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requred: true,
    },
    email:{
        type: String,
        requred: true,
        inique: true
    },
    role:{
        type: String,
        requred: true,
        default: 'NORMAL'
    },
    password:{
         type: String,
        requred: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User