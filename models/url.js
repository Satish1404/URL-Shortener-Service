const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        unique: true,
        required: true
    },
    redireactURL:{
        type: String,
        required: true  
    },
    visiteHistory:[{
        timestamps:{
            type: Date,
            default: Date.now
        }
    }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }

},{timestamps: true})

const URL = mongoose.model("URL", urlSchema)

module.exports = URL;