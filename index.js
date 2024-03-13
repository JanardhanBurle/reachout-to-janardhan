const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().nodemailer.email,
        pass: functions.config().nodemailer.password
    }
});

var allowlist = ['https://janardhan-portfolio.web.app', 'janardhan-portfolio.web.app', 'http://localhost:4200']

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});


app.post('/', cors(corsOptionsDelegate), async function (req, res) {
    let request = req.body;
    delete request._id;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        sender: 'My Portfolio: ${request.fullName}', // sender address
        to: `officemail.janardhan@gmail.com`, // list of receivers
        subject: `Message from ${request.fullName}`, // Subject line
        html: `Hi there,<br>
        You just received a meesage from Portfolio application. 
        <p>${request.fullName} / ${request.email} </p><br>
        <p>${request.message} </p>
        `, // html body
    }).catch((error) => {
        res.status(500).send(error.toString());
    });;
    if (info.messageId) {
        // send mail with defined transport object
        await transporter.sendMail({
            from: `Janardhanarao Burle <officemail.janardhan@gmail.com>`, // sender address
            sender: 'officemail.janardhan@gmail.com', // sender address
            to: `${request.email}`, // list of receivers
            subject: "Message from Janardhan", // Subject line
            text: ``, // plain text body
            html: `Dear <b> ${request.fullName}</b>,<br>
    <p>Thanks for your interest in my profile.</p>
    <p>I'll get back to you as soon as possible :)
    <br><br><br>
    <p>Kind Regards,<br>Janardhanarao Burle</p>
    `, // html body
        }).catch((error) => {
            res.status(500).send(error.toString());
        });;
        res.send(JSON.stringify({
            status: 200,
            message: 'success',
            data: {}
        }));
    }
});

exports.email = functions.https.onRequest(app);