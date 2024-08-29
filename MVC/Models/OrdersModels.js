const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: {
        type: [
            {
                itemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                count: {
                    type: Number,
                    required: true
                },
                itemCost:{
                    type:Number,
                    required:true
                }
            }
        ],
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});


module.exports = mongoose.model("Orders", orderSchema);