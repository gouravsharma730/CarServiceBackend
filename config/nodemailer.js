const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'speedyshinecar@gmail.com',
        pass: 'dmyf lrzj uhpz teic'
    }
});

module.exports = transporter;