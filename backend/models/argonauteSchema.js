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
        weapons : {
            type: Array,
            default: [],
            required : [true, 'An argonaute must come with his weapons']
        }
})

module.exports = mongoose.model('argonaute', argonauteSchema);