const express = require('express');
const mongoose = require('mongoose');
const { sendResponse, sendErrorResponse } = require('../Middlewares/Response');
const orderSchema = require("../Models/OrdersModels");
const checkAuth = require('../Middlewares/CheckAuth');
const orderController = express.Router();

orderController.get('/getAll', checkAuth, async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req._id);
        const result = await orderSchema.find();
        if (result) {
            sendResponse(res, true, "Orders fetched", result);
        }
        else {
            sendResponse(res, false, "Orders fetched Failed", {});
        }
    } catch (error) {
        sendErrorResponse(res, false, "Something went wrong try again!", {});
    }

});


orderController.post('/add', checkAuth, async (req, res, next) => {
    try {
        const orderData = new orderSchema({
            _id: new mongoose.Types.ObjectId,
            items: req.body.items,
            totalAmount: req.body.totalAmount,
            merchantId: req._id,
            paymentType: req.body.paymentType
        });
        console.log(orderData);
        const result = await orderData.save();
        if (result) {
            sendResponse(res, true, "Item Placed", result);
        }
        else {
            sendResponse(res, false, "Something went wrong try again", {});
        }
    } catch (error) {
        sendErrorResponse(res, false, "Something went wrong try again", {});
    }
});



module.exports = orderController;