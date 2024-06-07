const express = require("express");
const router = express.Router();
const path = require("path");
const {
  validateRequest,
} = require("../models/mail");
const asyncHandler = require("../middleware/asyncHandler");
const nodemailer = require("nodemailer");

router.get("/", asyncHandler(async (req, res) => {
  res.sendFile(path.join(__dirname + "/mail.html"));
}));

router.post("/", asyncHandler(async (req, res) => {
  const request = req.body;
  delete request._id;
  const {
    error,
  } = validateRequest(request);
  if (error) return res.status(400).send(error.details[0].message);
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "officemail.janardhan@gmail.com", // generated ethereal user
      pass: "swqgftnolujvkgbs", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    sender: "My Portfolio: ${request.fullName}", // sender address
    to: `officemail.janardhan@gmail.com`, // list of receivers
    subject: `Message from ${request.fullName}`, // Subject line
    html: `Hi there,<br>
        You just received a meesage from Portfolio application. 
        <p>${request.fullName} / ${request.email} </p><br>
        <p>${request.message} </p>
        `, // html body
  });
  if (info.messageId) {
    // send mail with defined transport object
    await transporter.sendMail({
      from: `Janardhanarao Burle <officemail.janardhan@gmail.com>`, // sender address
      sender: "officemail.janardhan@gmail.com", // sender address
      to: `${request.email}`, // list of receivers
      subject: "Message from Janardhan", // Subject line
      text: ``, // plain text body
      html: `Dear <b> ${request.fullName}</b>,<br>
    <p>Thanks for your interest in my profile.</p>
    <p>I'll get back to you as soon as possible :)
    <br><br><br>
    <p>Kind Regards,<br>Janardhanarao Burle</p>
    `, // html body
    });
    res.send(JSON.stringify({
      status: 200,
      message: "success",
      data: {},
    }));
  }
}));


module.exports = router;
