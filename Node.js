const nodemailer = require(`nodemailer`)

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // smtp.ethereal.email
    port: 587,
    secure: false,
    auth: {
        user: 'webkpi21@gmail.com', 
        pass: ''
    }
});

function mailer(message){
    transporter.sendMail(message, function(err, info){
        if(err)
        return console.log(err);
    else
    console.log(`Email sent: `, info);
})
}

module.exports = mailer
