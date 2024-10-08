'use server'

import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define a type for the expected response
interface EmailResponse {
  success: boolean;
  message: string;
}

// Define the function to send an email
export async function sendEmail(formData: FormData): Promise<EmailResponse> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('Attempting to send email:', { name, email, message });  // Debugging output

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
    });

    return { success: true, message: 'Email sent successfully' };
  } catch (error: unknown) {  // Use unknown instead of any
    // Check if the error has a message and log it accordingly
    if (error instanceof Error) {
      console.error('Error sending email:', error.message);
    } else {
      console.error('Error sending email:', error);
    }

    return { success: false, message: 'Failed to send email' };
  }
}
