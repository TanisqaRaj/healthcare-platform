// controllers/contactController.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Contact from '../models/Contact.js'; // Import the Contact model

dotenv.config();

// Configure the transporter with port 587 for TLS
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send contact email and save to database
export const sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Create a new contact instance
  const newContact = new Contact({
    name,
    email,
    message,
  });

  try {
    // Save contact submission to the database
    await newContact.save();

    // Prepare email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `You have received a new message from ${name} (${email}) :\n\n${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send(`Error sending message: ${error.message}`);
      }
      console.log('Email sent successfully:', info.response);
      res.status(200).send('Message sent successfully!');
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).send('Error saving contact information.');
  }
};
