const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const path = require('path');
const sendemail = require('../utils/email');
const htmlFilePath = path.join(__dirname,'../static/resetPassword.html');

router.post('',verifyToken, async function(req,res){
    try{
        const _id = req.user.id;
        const profileUpdate = req.body.password;
        const password = await bcrypt.hash(profileUpdate,10);
        const checkUpdate = await User.findByIdAndUpdate(_id,{password},{new:true});
        if(!checkUpdate) return res.status(404).json({message:"User not found"});
        const message = [{message:"Profile updated successfully"},checkUpdate];
        const subject = "Password Reset Successful";
        await sendemail(req.user.email,subject,'',htmlFilePath,req.user.userName);
        return res.status(200).json({message:req.body});        
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
})

module.exports = router;