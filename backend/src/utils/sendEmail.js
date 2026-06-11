import nodemailer from "nodemailer";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_TO } =
  process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT) || 465,
  secure: Number(MAIL_PORT) === 465,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export const sendHelpEmail = async ({ email, comment }) => {
  await transporter.sendMail({
    from: MAIL_USER,
    to: MAIL_TO || MAIL_USER,
    replyTo: email,
    subject: "TaskPro - Need help request",
    text: `From: ${email}\n\n${comment}`,
  });
};
