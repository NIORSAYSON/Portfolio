import nodemailer from "nodemailer";

const EMAIL = "nessayson@gmail.com";
const PASS = "ffxvteezgrwnjryj";

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
