const mongoose  = require('mongoose');

const itemSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    itemImage:{
        type:String,
        required:true
    },
    merchantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});


module.exports = mongoose.model("Items",itemSchema);