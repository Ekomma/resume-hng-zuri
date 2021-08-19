const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const path = require("path");
const colors = require("colors");
const nodemailer = require("nodemailer")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")));

app.post("/send",  async (req, res) => {
    const { name, email, subject, message } = req.body
    const output = `
    <h1>New Contact Request<h1>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${name}</li>
        <li>Name: ${email}</li>
        <li>Name: ${subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${message}</p>
    `

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"name" <${email}>`, // sender address
        to: `${process.env.MAIL_USER}, <${process.env.MAIL_USER}>`, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    res.send(`Thanks for contacting Ogheneovo, your mail has been sent. <a href="/">Home</a>`)
})

app.get("/", (req, res)=> {
    res.sendFile("index.html")
})


app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on ${PORT}`.yellow.bold));

