const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const BookService= require('../models/Booking');
const User = require('../models/User');

router.post('/',verifyToken, async function(req,res){
    const bookingDetails = req.body;
    bookingDetails.carDetails[0].ownerId = req.user.id;
    const booking = new BookService(bookingDetails);
    await booking.save();
    const user = await User.findOneAndUpdate(
        {_id:req['user']['id']},
    {
        $push:{
            bookingHistory:{
                date:new Date(),
                carDetails:bookingDetails.carDetails[0].carNumber
            }},
            $inc:{bookingCount:1},
        },{new:true}
        )
    return res.status(200).json({message:bookingDetails});
})

module.exports = router;