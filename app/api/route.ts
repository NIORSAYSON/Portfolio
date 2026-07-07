import { transporter, mailOptions } from "@/config/nodemailer";
import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function dataToHTML(data: ContactFormData) {
  return Object.entries(data).reduce(
    (html, [k, v]) => html + `<h3>${escapeHtml(k)}:</h3><p>${escapeHtml(v)}</p>`,
    "",
  );
}

export async function POST(request: Request) {
  const data = (await request.json()) as ContactFormData;
  try {
    await transporter.sendMail({
      ...mailOptions,
      replyTo: data.email,
      subject: "New contact form submission",
      html: `<div>${dataToHTML(data)}</div>`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Mail failed" }, { status: 500 });
  }
}
