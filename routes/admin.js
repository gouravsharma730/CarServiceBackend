const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');


const nodemailer = require('nodemailer');

// Create a transporter with your ESP credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heiscodingmaster@gmail.com',
        pass: 'jnep tspw polx jekq'
    }
});


router.get('/',async function (req,res){
    const newBooking = await Booking.find({ServiceStatus:"pending"}).sort({bookingTime:1});
    return res.status(200).json({"message":newBooking});
})

router.post('/',async function (req,res){
    const _id= req.body._id;
    const serviceStatus = req.body.serviceStatus;
    const sendBookinngStatus = await Booking.findByIdAndUpdate(_id,{serviceStatus},{new:true});

    const text = `Hi,\n Your service has beenn successfully book. The estimation time to drop your car back is  ${sendBookinngStatus['DateOfCarDrop']}`;
    const ownerId = sendBookinngStatus['carDetails'][0]["ownerId"];
    const customerEmailprofile= await User.find({_id:ownerId});
    const customerEmail = customerEmailprofile[0]['email'];
    const mailOptions = {
        from: 'heiscodingmaster@gmail.com',
        to: customerEmail,
        subject: 'Service Booking Confirmation',
        text: text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return res.status(200).json({"message":sendBookinngStatus});
})


module.exports = router;