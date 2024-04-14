const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heiscodingmaster@gmail.com',
        pass: 'jnep tspw polx jekq'
    }
});

module.exports = transporter;