const transporter = require('../config/nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail(to,subject,text,htmlFilePath,userName){
    try{
        const htmlContent = fs.readFileSync(path.join(htmlFilePath), 'utf8');
        const mailOption={
            from: 'heiscodingmaster@gmail.com',
            to,
            subject,
            text,
            html:htmlContent.replace('${userName}',userName)
        };
        const info = await transporter.sendMail(mailOption);
        return true;
    } catch (err){
        return res.status(500).json({message:"Internal server error!"});
    }
}

module.exports= sendEmail;