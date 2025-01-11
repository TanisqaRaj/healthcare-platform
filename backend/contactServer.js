import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT_CONTACTSERVER || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configure the transporter with port 587 for TLS
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use port 587 for TLS
  secure: false, // Use false for explicit TLS
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address from .env
    pass: process.env.EMAIL_PASSWORD // App-specific password from .env
  },
  tls: {
    rejectUnauthorized: false // Optional, allows self-signed certificates
  }
});

// POST endpoint for sending email
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Your email address where you receive messages
    subject: `Contact Form Submission from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(`Error sending message: ${error.message}`);
    }
    console.log('Email sent successfully:', info.response);
    res.status(200).send('Message sent successfully!');
  });
});

// Test route for sending a test email
app.get('/test-email', (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send test email to yourself
    subject: 'Test email',
    text: 'This is a test email.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending test email:', error);
      return res.status(500).send('Error sending test email.');
    }
    console.log('Test email sent successfully:', info.response);
    res.status(200).send('Test email sent successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`contact Server is running on port ${PORT}`);
});