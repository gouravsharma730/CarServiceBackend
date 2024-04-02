const mongoose = require('mongoose');
 const bookingSchema = new mongoose.Schema({
    carDetails:[{
        ownerId:String,
        carNumber:String,
        carModel:String,
        serviceType:{
            type:String,
            default:"Full service"
        },
        serviceStatus:{
            type:String,
            default:"Pending"
        }
    }],
    DateOfPickUp: Date,
    DateOfService:Date,
    DateOfCarDrop:Date,
    serviceStatus:{type:String,default:'pending'},
    bookingTime: {type:Date, default:Date.now}
 })

module.exports= mongoose.model("BookService",bookingSchema);