const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user:{type:String,required:true},
    content:{type:String,required:true},
    rating:{type:Number, required:true, min:0,max:10},
    createdAt:{type:Date,default:Date.now},
    comments:[{
        user:{type:String,required:true},
        content:{type:String,required:true},
        createdAt:{type:Date,default:Date.now}
    }],
    likes:[{type:String}],
    dislikes:[{type:String}]
})

module.exports =mongoose.model('Reviews',reviewSchema);