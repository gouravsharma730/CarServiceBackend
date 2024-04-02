const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

router.post('',verifyToken, async function(req,res){
    const _id = req.user.id;
    const profileUpdate = req.body;
    const checkUpdate = await User.findByIdAndUpdate(_id,profileUpdate,{new:true});
    if(!checkUpdate) return res.status(404).json({message:"User not found"});
    const message = [{message:"Profile updated successfully"},{data:checkUpdate}];
    res.status(200).json({message:message});
})

module.exports = router;