const express = require('express');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
const sendemail = require('../../utils/email');
const bcrypt = require('bcrypt');
const resetPasswordHTML = path.join(__dirname,'../static/resetPassword.html');
const forgetPasswordHTML = path.join(__dirname,'../static/forgetPassword.html');
const jwt = require('jsonwebtoken');

const forgetPassword = async function(req,res){
    const email = req.body.email;
    let userCheck = await User.find({email});
    if(userCheck.length==0) return res.status(404).json({message:"Invalid Email address!"})
    const subject= 'Password Change Request: Action Required'
    const text = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: '700h' });
    const response = await sendEmail(email,subject,text,forgetPasswordHTML,userCheck[0].userName);
    const token = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: '700h' });

    return res.status(201).json({message:response,token});
}

const profileUpdate = async function(req,res){
    const _id = req.user.id;
    const profileUpdate = req.body;
    const checkUpdate = await User.findByIdAndUpdate(_id,profileUpdate,{new:true});
    if(!checkUpdate) return res.status(404).json({message:"User not found"});
    const message = [{message:"Profile updated successfully"},{data:checkUpdate}];
    res.status(200).json({message:message});
}

const resetPassword =  async function(req,res){
    try{
        const _id = req.user.id;
        const profileUpdate = req.body.password;
        const password = await bcrypt.hash(profileUpdate,10);
        const checkUpdate = await User.findByIdAndUpdate(_id,{password},{new:true});
        if(!checkUpdate) return res.status(404).json({message:"User not found"});
        const message = [{message:"Profile updated successfully"},checkUpdate];
        const subject = "Password Reset Successful";
        await sendemail(req.user.email,subject,'',resetPasswordHTML,req.user.userName);
        return res.status(200).json({message:req.body});        
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports= {profileUpdate, resetPassword, forgetPassword};
