import nodemailer from "nodemailer";

const EMAIL = process.env.SMTP_EMAIL;
const PASS = process.env.SMTP_PASS;

if (!EMAIL || !PASS) {
  throw new Error("Missing SMTP_EMAIL or SMTP_PASS environment variables.");
}

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

export const mailOptions = {
  from: EMAIL,
  to: EMAIL,
};
