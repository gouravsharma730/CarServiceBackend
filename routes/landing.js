const express =  require('express');
router = express.Router();
const path = require('path');

router.get('/',function(req,res){
    try{
        res.sendFile(path.join(__dirname,'..', 'static','landing.html'))
    }catch(err){
        res.status(500).json({error:err});
    }
})

module.exports = router;