import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

export const sendResetEmail = async (email, token) => {
  const templatePath = path.resolve('src/templates/resetPassword.html');
  const html = fs.readFileSync(templatePath, 'utf-8').replace('{{TOKEN}}', token);

  await transporter.sendMail({
    from: 'Ecommerce App',
    to: email,
    subject: 'Recuperación de contraseña', 
    html
  });
};
