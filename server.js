const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const path = require('path');

// Serve static assets from folders
app.use(express.static(__dirname));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Production / Clean Route Aliases for Pages
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'resume.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

app.get('/resume.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'resume.html'));
});

// Transporter Configuration using Gmail App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer configuration error:', error);
    } else {
        console.log('Nodemailer server is ready to send emails');
    }
});

// API Route for sending contact form email
app.post('/api/send-email', async (req, res) => {
    const { from_name, reply_to, subject, message } = req.body;

    if (!reply_to || !message) {
        return res.status(400).json({ success: false, error: 'Email and message are required fields.' });
    }

    const mailOptions = {
        from: `"${from_name || 'Portfolio Visitor'}" <${process.env.EMAIL_USER}>`,
        replyTo: reply_to,
        to: process.env.EMAIL_USER, // sends directly to areebamajeed212@gmail.com
        subject: `[Portfolio Contact] ${subject || 'New Message from ' + (from_name || reply_to)}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e7ff; border-radius: 12px; background-color: #ffffff;">
                <h2 style="color: #4f46e5; margin-top: 0;">New Message from Portfolio Website</h2>
                <div style="padding: 16px; background-color: #f8fafc; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 6px 0; color: #1e1b4b;"><strong>Sender Name:</strong> ${from_name || 'N/A'}</p>
                    <p style="margin: 6px 0; color: #1e1b4b;"><strong>Sender Email:</strong> <a href="mailto:${reply_to}">${reply_to}</a></p>
                    <p style="margin: 6px 0; color: #1e1b4b;"><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                </div>
                <h3 style="color: #1e1b4b; margin-bottom: 8px;">Message Content:</h3>
                <div style="padding: 16px; background-color: #f0f5ff; border-left: 4px solid #4f46e5; border-radius: 4px; color: #334155; line-height: 1.6; whitespace: pre-wrap;">
                    ${message}
                </div>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 12px 0;">
                <p style="font-size: 0.8rem; color: #94a3b8; text-align: center; margin: 0;">Sent automatically via Portfolio Nodemailer API Service</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email via Nodemailer:', error);
        return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
    }
});

// Wildcard catch-all fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
