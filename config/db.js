const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/carWash',{useNewUrlParser:true,useUnifiedTopology:true});

const db =  mongoose.connection;
db.on('error',()=>console.log('MongoDB connection error.'));
db.on('open',()=>console.log('mongoDB connected.'))


module.exports = db;