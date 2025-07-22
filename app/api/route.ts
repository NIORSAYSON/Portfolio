import { transporter, mailOptions } from "../../config/nodemailer";
import { NextResponse } from "next/server";

function dataToHTML(data: Record<string, any>) {
  return Object.entries(data).reduce(
    (html, [key, value]) => html + `<h3>${key}:</h3><p>${value}</p>`,
    ""
  );
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "Contact Form Submission",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <body>
          <div style="width:50%;margin:auto;padding:10px;border:1px dotted #000">
            <h1>Contact Form</h1>
            ${dataToHTML(data)}
          </div>
        </body>
        </html>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Mail send error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
