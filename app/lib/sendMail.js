"use server";
import nodeMailer from "nodemailer";

export default async function sendMail(data) {
  const transporter = nodeMailer.createTransport({
    port: 465,
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: true,
  });

  const mailData = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `Message From ${data?.firstName} ${data?.lastName}`,
    text: data?.message + " | Sent from: " + data.email,
    html: `<div>${data.message}</div><p>Sent from: ${data.email}</p>`,
  };

  const info = await transporter.sendMail(mailData);
  return info.messageId ? info : "failed";
}
