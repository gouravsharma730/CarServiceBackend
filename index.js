const express =  require('express');
const app =  express();
const path = require('path');
const landing = require('./routes/landing');
const signUp = require('./routes/signup');
const login = require('./routes/login');
const home = require('./routes/homepage');
const profileEdit = require('./routes/profileEdit');
const booking = require('./routes/booking');
const admin = require('./routes/admin');
const reviews = require('./routes/reviews');
const logout = require('./routes/logout');

require('./db');


app.use(express.json());
app.use(express.static(path.join(__dirname,'static')))
app.use('/',landing);
app.use('/signup',signUp);
app.use('/login',login);
app.use('/logout',logout);
app.use('/home',home);
app.use('/profile/edit',profileEdit);
app.use('/booking',booking);
app.use('/admin',admin);
app.use('/reviews',reviews);

app.listen(3000,()=>{
    console.log('Book Wash servies');
})