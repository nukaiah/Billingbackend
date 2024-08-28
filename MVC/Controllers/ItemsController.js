const express = require('express');
const mongoose = require('mongoose');
const { sendResponse, sendErrorResponse } = require('../Middlewares/Response');
const checkAuth = require('../Middlewares/CheckAuth');
const itemSchema = require('../Models/ItemsModels');
const itemController = express.Router();
const upload = require('../Middlewares/multer');
const cloudinary = require("../Middlewares/Cloudinary");

itemController.get('/getAll', checkAuth, async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req._id);
        const result = await itemSchema.aggregate([
            {
                $match: { merchantId: userId }
            }
        ]);
        if (result) {
            sendResponse(res, true, "Items fetched", result);
        }
        else {
            sendResponse(res, false, "Items fetched Failed", {});
        }
    } catch (error) {
        sendErrorResponse(res, false, "Something went wrong try again!", {});
    }
});


itemController.post('/add', checkAuth,upload.fields([{ name: 'image' }]),async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try {
        if (req.files && req.files['image']) {
            console.log(req.files['image'][0].path);
            itemimage = (await cloudinary.uploader.upload(req.files['image'][0].path, { folder: 'Items/' })).url;
            const itemData = new itemSchema({
                _id: new mongoose.Types.ObjectId,
                itemName: req.body.itemName,
                itemPrice: req.body.itemPrice,
                itemImage: itemimage,
                status: "Active",
                merchantId: req._id,
                categoryId: req.body.categoryId,
            });
            const result = await itemData.save();
            if (result) {
                sendResponse(res, true, "Item Added", result);
            }
            else {
                sendResponse(res, false, "Something went wrong try again", {});
            }
        }
    } catch (error) {
        sendErrorResponse(res, false, "Something went wrong try again", {});

    }
});


module.exports = itemController;