const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    try{
        res.status(201).json({message:"This is the home page of the app."})
    }catch(err){
        res.status(500).json({error:"this error is from Home page."})
    }
})

module.exports = router;