const nodemailer = require('nodemailer');

const sendEmailNotification = async (recipient, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amitkumat823906@gmail.com',
        pass: 'Amitbabu@321',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: 'amitkumar823900@gmail.com',
      to: recipient,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.response);
  } catch (error) {
    console.error('Error sending email notification', error);
  }
};

// Call the function to send an email notification
sendEmailNotification('recipient@example.com', 'Notification Subject', 'Student fill form');
