const express = require('express');
const mongoose = require('mongoose');
const { sendResponse, sendErrorResponse } = require('../Middlewares/Response');
const checkAuth = require('../Middlewares/CheckAuth');
const categorySchema = require('../Models/CategoryModels');
const categoryController = express.Router();

categoryController.get('/getAll', checkAuth, async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req._id);
        const result = await categorySchema.aggregate([
            {
                $match: { merchantId: userId }
            }
        ]);
        if (result) {
            sendResponse(res, true, "Categories fetched", result);
        }
        else {
            sendResponse(res, false, "Categories fetched Failed", {});
        }
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, false, "Something went wrong try again!", {});
    }
});


categoryController.post('/add', checkAuth, async (req, res, next) => {
    try {
        const categoryData = new categorySchema({
            _id: new mongoose.Types.ObjectId,
            categoryName: req.body.categoryName,
            categoryImage: "cat.png",
            merchantId: req._id,
        });
        var result = await categoryData.save();
        if (result) {
            sendResponse(res, true, "Sucessfully Added Category", result);
        }
        else {
            sendResponse(res, false, "Failed to Added Category", result);
        }
    } catch (error) {
        console.log(error);
        sendResponse(res, false, "Failed To Added Category", error);
    }
});


module.exports = categoryController;