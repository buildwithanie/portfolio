'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'agithinji020@gmail.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Failed to send email' }
  }
}
