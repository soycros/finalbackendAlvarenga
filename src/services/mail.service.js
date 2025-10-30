import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  throw new Error('Faltan las credenciales de correo en el archivo .env');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

export const sendResetEmail = async (email, token) => {
  try {
    const templatePath = path.resolve('src/templates/resetPassword.html');

    if (!fs.existsSync(templatePath)) {
      throw new Error('No se encontró la plantilla de correo');
    }

    const html = fs.readFileSync(templatePath, 'utf-8').replace('{{TOKEN}}', token);

    await transporter.sendMail({
      from: `"Ecommerce App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Recuperación de contraseña',
      html
    });

    console.log(`Email de recuperación enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
};
