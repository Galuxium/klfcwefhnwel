// emailSender.ts

import nodemailer from 'nodemailer';
import { ResendMessage } from 'resend';

interface IEmailProps {
  to: string;
  subject: string;
  html: string;
}

const sendEmailUsingNodemailer = async ({ to, subject, html }: IEmailProps) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to,
    subject,
    html,
  });
};

const sendEmailUsingResend = async ({ to, subject, html }: IEmailProps) => {
  const apiKey = 'your-resend-api-key';
  const message: ResendMessage = {
    from: 'Your Name <your-email@gmail.com>',
    to,
    subject,
    text: html,
    html,
  };

  await fetch('https://api.resend.io/v1/messages/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(message),
  }).then((res) => res.json());
};

export { sendEmailUsingNodemailer, sendEmailUsingResend };