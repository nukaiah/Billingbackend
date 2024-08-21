const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Merchants",merchantSchema);