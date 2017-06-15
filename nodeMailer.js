var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "purojitu@gmail.com",
        pass: "Myproject1234"
    }
});

let exportsMethod = {

    sendMail(sendTo, registerationCode) {
        console.log(sendTo)
        var mailOptions = {
            from: 'Honest Response',
            to: sendTo,
            subject: 'Registeration Code from Honest Response',
            html: `<p>Your Registeration code is: <strong>${registerationCode}</strong> </p>`
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