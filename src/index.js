const express =  require('express');
const app =  express();
require('../config/db');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const userRoutes = require('./routes/user');

const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname,'static')))
app.use('/',userRoutes);


app.listen(4000,()=>{
})