const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const merchantController = express.Router();
const { sendResponse, sendErrorResponse } = require('../Middlewares/Response');
const merchantSchema = require('../Models/MerchantModels');

merchantController.post("/register", async (req, res, next) => {
    try {
        const password = await bcrypt.hash(req.body.password, 15);
        if (password) {
            const merchantData = new merchantSchema({
                _id: new mongoose.Types.ObjectId,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                status: "Active",
                password: password,
                loginStatus: false,
                userType: req.body.userType
            });
            var result = await merchantData.save();
            if (result) {
                sendResponse(res, true, "Sucessfully Added Category", result);
            }
            else {
                sendResponse(res, false, "Failed to Added Category", result);
            }
        }
        else {
            sendErrorResponse(res, false, "failed to register user", {});
        }
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                sendErrorResponse(res, false, "This email is already existed", {});
            } else if (error.keyPattern.phone) {
                sendErrorResponse(res, false, "This phone number is already existed", {});
            }
        } else {
            sendErrorResponse(res, false, error.keyValue, {});
        }
    }
});

// merchantController.post("/login", async (req,res,next)=>{
//     try {
//         var query = { email: req.body.email};
//         var result = await merchantSchema.find(query);
//         if(result.length==0){
//             sendResponse(res,false,"No User found with the email",{});
//         }
//         else{
//             if(result[0].loginStatus==true){
//                 sendResponse(res,false,"Already Loggedin Somewhere else",{});
//             }
//             else{
//                   const passwordMatched = await bcrypt.compare(req.body.password, result[0]["password"]);
//                   if(passwordMatched){
//                       const token = jwt.sign({
//                           _id:result[0]._id,
//                           userType:result[0].userType
//                       },'sensitive data',{expiresIn:"24h"});
//                       if(token){
//                           res.status(200).json({
//                               status:true,
//                               message:"Logged in sucessfully",
//                               token:token,
//                               data:result[0]
//                           });
//                       }
//                       else{
//                           sendResponse(res,true,"Failed to login try again",{});
//                       }
//                   }
//                   else{
//                       sendResponse(res,false,"Password is not matched",{});
//                   }
//                   result[0].loginStatus==undefined?await merchantSchema.findByIdAndUpdate(
//                     {_id:result[0]._id},
//                     { $set: { loginStatus:true} }
//                   ):null
//             }
//         }
//     } catch (error) {
//         sendErrorResponse(res,false,"Something went wrong try again!",{});
//     }
// });



merchantController.post("/login", async (req, res, next) => {
    try {
        const query = { email: req.body.email };
        const result = await merchantSchema.findOne(query);
        if (!result) {
            sendResponse(res, false, "No User found with the email", {});
        }
        else {
            const passwordMatched = await bcrypt.compare(req.body.password, result.password);
                if (passwordMatched) {
                    const token = jwt.sign({
                        _id: result._id,
                        userType: result.userType
                    }, 'sensitive data', { expiresIn: "24h" });
                    res.status(200).json({
                        status: true,
                        message: "Logged in successfully",
                        token: token,
                        data: result
                    });
                }
                else {
                    sendResponse(res, false, "Password is not matched", {});
                }

            // if (result.loginStatus) {
            //     sendResponse(res, false, "Already logged in elsewhere. Please log out first.", {});
            // }
            // else {
            //     const passwordMatched = await bcrypt.compare(req.body.password, result.password);
            //     if (passwordMatched) {
            //         const token = jwt.sign({
            //             _id: result._id,
            //             userType: result.userType
            //         }, 'sensitive data', { expiresIn: "24h" });
            //         res.status(200).json({
            //             status: true,
            //             message: "Logged in successfully",
            //             token: token,
            //             data: result
            //         });
            //     }
            //     else {
            //         sendResponse(res, false, "Password is not matched", {});
            //     }

            // }
        }
    } catch (error) {
        sendErrorResponse(res, false, "Something went wrong, try again!", {});
    }
});




module.exports = merchantController;