const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/email');
router.get('/',async function (req,res){
    const newBooking = await Booking.find({ServiceStatus:"pending"}).sort({bookingTime:1});
    return res.status(200).json({"message":newBooking});
})

router.post('/',async function (req,res){
    const _id= req.body._id;
    const serviceStatus = req.body.serviceStatus;
    const sendBookinngStatus = await Booking.findByIdAndUpdate(_id,{serviceStatus},{new:true});

    const ownerId = sendBookinngStatus['carDetails'][0]["ownerId"];
    const customerEmailprofile= await User.find({_id:ownerId});
    const customerEmail = customerEmailprofile[0]['email'];
    const customerName = customerEmailprofile[0]['userName'];
    const text = `Hi,${customerName}\n Your service has beenn successfully book. The estimation time to drop your car back is  ${sendBookinngStatus['DateOfCarDrop']}`;

    try{
        await sendEmail(customerEmail,'Booking Confirmed, text')
    }catch(err){
        return res.send(500).json({message:"Enternal server error"});
    }
    return res.status(200).json({"message":sendBookinngStatus});
})


module.exports = router;