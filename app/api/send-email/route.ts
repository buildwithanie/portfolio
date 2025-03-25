import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    console.log("Attempting to send email:", { name, email, message });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: "agithinji020@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}

---
Reply directly to this email to respond to ${name}.
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Contact Form Submission</h2>
  <p><strong>From:</strong> ${name} (${email})</p>
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-line;">${message}</p>
  <hr style="border: 1px solid #eee; margin: 20px 0;">
  <p style="color: #666; font-size: 14px;">You can reply directly to this email to respond to ${name}.</p>
</div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully" 
    });
  } catch (error: unknown) {
    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Error sending email:", error);
    }

    return NextResponse.json({ 
      success: false, 
      message: "Failed to send email", 
      error: errorMessage 
    }, { status: 500 });
  }
}