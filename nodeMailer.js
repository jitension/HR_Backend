var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "gmail_id",
        pass: "gmail_password"
    }
});

let exportsMethod = {

    sendMail(first_name, sendTo, registerationCode) {
        var mailOptions = {
            from: 'Honest Response',
            to: sendTo,
            subject: 'Registeration Code from Honest Response',
            html: `<p> Hello ${first_name}, </p>
                   <p>Your Registeration code is: 
                   <strong>${registerationCode}</strong> </p>
                   <br />
                   <p>Regards, </p>
                   <h4> Team Honest Response </h4>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = exportsMethod;
