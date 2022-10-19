// import mongoose
const mongoose = require('mongoose');


const argonauteSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            minlength: 2,
            maxlength: 35 ,
            unique : true
        },
        age : {
            type: Number,
            required : [true, "An argonaute have an age"]
        },
        strength : {
            type: Number,
            required : [true, 'An argonaute must have a strength']
        },
        weapon : {
            type: String,
            required : [true, 'An argonaute must come with his weapon']
        }
})

module.exports = mongoose.model('argonaute', argonauteSchema);