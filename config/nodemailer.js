import nodemailer from "nodemailer";

const email = "nessayson@gmail.com";
const password = "ffxvteezgrwnjryj";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
