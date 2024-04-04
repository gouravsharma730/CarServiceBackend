const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/',verifyToken,function(req,res){
    res.clearCookie('jwtToken');
    res.status.json({message:"Logout successfully."});
})

module.exports=router;