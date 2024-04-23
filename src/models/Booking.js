const mongoose = require('mongoose');
 const bookingSchema = new mongoose.Schema({
    carDetails:{
        ownerId:String,
        carNumber:String,
        carModel:String,
        serviceType:{
            type:String,
            default:"Full service"
        },
        serviceStatus:{
            type:String,
            default:"Awaiting Confirmation"
        }
    },
    address:String,
    DateOfPickUp: Date,
    PickUpAddress:String,
    DateOfService:Date,
    DateOfCarDrop:Date,
    serviceStatus:{type:String,default:'Awaiting Confirmation'},
    bookingTime: {type:Date, default:Date.now}
 })

module.exports= mongoose.model("BookService",bookingSchema);