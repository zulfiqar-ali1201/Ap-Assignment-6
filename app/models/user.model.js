'use strict';
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    UserId: String,
    UserName: String,
    UserEmail: String,
    Password: String
   
},{
    timestamps:true
});

module.exports=mongoose.model('User',UserSchema);
