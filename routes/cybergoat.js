const Joi = require('joi');
const express = require('express');
const router = express.Router();
const path = require('path');
const {
    validateRequest
} = require('../models/mail');
const asyncHandler = require('../middleware/asyncHandler');
const nodemailer = require("nodemailer");

router.get('/', asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname + '/mail.html'));
}));

router.post('/', asyncHandler(async (req, res) => {
    let request = req.body;
    delete request._id;
    const {
        error
    } = validateRequest(request);
    if (error) return res.status(400).send(error.details[0].message);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "titan",
        host: "smtp.titan.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'customersupport@cybergoat.ae', // generated ethereal user
            pass: 'Customersupport@cybergoat123', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        sender: 'Cyber GOAT: ${request.fullName}', // sender address
        to: `customersupport@cybergoat.ae`, // list of receivers
        subject: `Message from ${request.fullName}`, // Subject line
        html: `Hi there,<br>
        You just received a mail from www.cybergoat.ae website. 
        <p>${request.fullName} / ${request.email} </p><br>
        <p>${request.message} </p>
        `, // html body
    });
    if (info.messageId) {
        // send mail with defined transport object
        await transporter.sendMail({
            from: `Customer Support - CyberGOAT <customersupport@cybergoat.ae>`, // sender address
            sender: 'customersupport@cybergoat.ae', // sender address
            to: `${request.email}`, // list of receivers
            subject: "We've received your message.", // Subject line
            text: ``, // plain text body
            html: `Dear <b> ${request.fullName}</b>,<br>
    <p>Thanks for reaching out us.</p>
    <p>Our customer support representative will reachout to as soon as possible :)
    <br><br><br>
    <p>Kind Regards,<br>Customer Support Team! <br> www.cybergoat.ae</p>
    `, // html body
        });
        res.send(JSON.stringify({
            status: 200,
            message: 'success',
            data: {}
        }));
    }
}));


module.exports = router;