const mongoose =require('mongoose');
const validator=require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Please Enter a Valid Email ']
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        "enum":["admin","user","staff"],
        default:"user"
    },
    otp:{
        type:String
    }
});


module.exports=mongoose.model("users",userSchema);