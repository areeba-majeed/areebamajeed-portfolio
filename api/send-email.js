const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const { from_name, reply_to, subject, message } = req.body || {};

    if (!reply_to || !message) {
        return res.status(400).json({ success: false, error: 'Email and message are required fields.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'areebamajeed212@gmail.com',
            pass: process.env.EMAIL_PASS || 'enlkypjhpcmduvpl'
        }
    });

    const mailOptions = {
        from: `"${from_name || 'Portfolio Visitor'}" <${process.env.EMAIL_USER || 'areebamajeed212@gmail.com'}>`,
        replyTo: reply_to,
        to: process.env.EMAIL_USER || 'areebamajeed212@gmail.com',
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
                <p style="font-size: 0.8rem; color: #94a3b8; text-align: center; margin: 0;">Sent automatically via Portfolio Serverless Nodemailer Service</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via Vercel Serverless:', info.response);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
    }
};
