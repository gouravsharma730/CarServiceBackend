const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const sendEmail = require('../../utils/email');


const adminHome = async function(req,res){
  try{
    const pendingBookings = await Booking.find({serviceStatus:'Affirmation pending'});
    const totalBookings = await Booking.find({}).sort({'bookingTime.date':1});
    return res.status(200).json({"message":{pendingBookings,totalBookings}});
  }catch(error){
    return res.status(500).json({message: error.message});
  }
}

const bookingResponse = async function(req,res){
  try{
    const _id= req.body.bookingId;
    const serviceStatus = req.body.newStatus;
    const sendBookinngStatus = await Booking.findByIdAndUpdate(_id,{serviceStatus},{new:true});
    const ownerId = sendBookinngStatus['carDetails']["ownerId"];
    const customerEmailprofile= await User.find({_id:ownerId});
    const customerEmail = customerEmailprofile[0]['email'];
    const customerName = customerEmailprofile[0]['userName'];
    const text = `Hi,${customerName}\n Your service has beenn successfully book. The estimation time to drop your car back is  ${sendBookinngStatus['DateOfCarDrop']}`;
    const mailStatus = await sendEmail(customerEmail,'Booking Confirmed, text');
    return res.status(200).json({message:sendBookinngStatus});
    }catch(err){
        return res.status(500).json({message:err});
    }
}

module.exports = {adminHome, bookingResponse}