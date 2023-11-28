require("dotenv").config({ path: "../config/.env" });
const { createTransport } = require("nodemailer");
const path = require("path");

const sendMail = async (options) => {
  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // you@mailsire.com -- Domain Name from forwardemail.net
  const message = {
    from: `${process.env.FROM_NAME}<${process.env.EMAIL}>`,
    to: "bsurumcuoglu@gmail.com",
    subject: "Send email using nodemailer in Node.js",
    text: options?.text || "Hello world?",
    html: options?.html || "<b>Hello world?</b>",
    attachments: [
      {
        filename: "download.jpeg",
        path: path.join(__dirname, "../upload/download.jpeg"),
        contentType: "image/jpeg",
      },
    ],
  };

  const info = await transporter.sendMail(message);
  console.log(info);
};

module.exports = sendMail;
