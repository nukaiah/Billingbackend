const mongoose  = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    },
    categoryImage:{
        type:String,
        required:true
    },
    merchantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});


module.exports = mongoose.model("Category",categorySchema);