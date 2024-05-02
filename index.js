const express =  require('express');
const app =  express();
require('dotenv').config();
require('./config/db');
const cors = require('cors');
const port = 4000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.frontendURL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: process.env.frontendURL,
  credentials: true
}));

const userRoutes = require('./src/routes/user');

const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname,'static')))
app.use('/',((req, res)=>{
  res.status(200).send({message : "working"})
}));
// app.use('/',userRoutes);


app.listen(port,()=>{
})