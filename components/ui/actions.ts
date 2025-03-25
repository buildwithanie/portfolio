"use server"

import { Resend } from "resend"

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY)

// Define a type for the expected response
interface EmailResponse {
  success: boolean
  message: string
  error?: string // Added error property to the interface
}

// Define the function to send an email
export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  console.log("Attempting to send email:", { name, email, message }) // Debugging output

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "agithinji020@gmail.com",
      replyTo: email, // Changed from reply_to to replyTo (camelCase)
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
    })

    return { success: true, message: "Email sent successfully" }
  } catch (error: unknown) {
    // Use unknown instead of any
    // Check if the error has a message and log it accordingly
    let errorMessage = "Failed to send email"

    if (error instanceof Error) {
      console.error("Error sending email:", error.message)
      errorMessage = error.message
    } else {
      console.error("Error sending email:", error)
    }

    return {
      success: false,
      message: "Failed to send email",
      error: errorMessage, // Include the error message
    }
  }
}

