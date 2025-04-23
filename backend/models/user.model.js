const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{type:String},
    email:{type:String, required:true, unique:true},
    password:{type:String},
    createdOn:{type:Date,default:new Date().getTime()},
});

module.exports = mongoose.model('User', userSchema);