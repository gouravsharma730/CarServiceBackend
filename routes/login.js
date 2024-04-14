const express = require('express');
router = express.Router();
const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken');

router.get('/',function(req,res){
    try{
        res.sendFile(path.join(__dirname,'../static','login.html'));
    }catch(error){
        res.status(500).json({error:'This error is from login page'});
    }
})

router.post('/',verifyToken, async function(req,res){
    try{
        if (!req.body || !req.body.email || !req.body.password){
            return res.status(400).json({ error: 'Missing email in request body!' });
        }
        const email=req.body.email;
        const userCheck = await User.find({email:email});
        if(!userCheck[0]){
         return res.status(201).json({message:"User not found."});
        }
        const matchPassword = await bcrypt.compare(req.body.password,userCheck[0]['password']);
        if(!matchPassword) res.status(201).json({message:"Incorrect password"});
        const token = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: '700h' });
        const message =[{message:userCheck},{ token: token }]
        return res.status(201).json({message:message});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
})


module.exports = router;