import { defineEventHandler, readBody, createError } from 'h3'
import { createEmailService } from '~/server/utils/emailService'
import { validateEmail, validateRequiredFields } from '~/server/utils/validation'

interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  agreeToPrivacy?: boolean
}

const buildContactEmail = (submission: ContactSubmission) => {
  return `
    <div>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Subject:</strong> ${submission.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message.replace(/\n/g, '<br />')}</p>
    </div>
  `
}

export default defineEventHandler(async (event) => {
  try {
    const emailService = createEmailService()

    const payload = await readBody<ContactSubmission>(event)
    console.log('Received payload:', JSON.stringify(payload, null, 2))

    if (!payload) {
      console.error('No payload received')
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Missing payload' 
      })
    }

    validateRequiredFields(payload, ['name', 'email', 'subject', 'message'])
    validateEmail(payload.email)

    console.log('Sending email via Resend...')
    const { data, error } = await emailService.send({
      from: 'Bromley Cyber Contact <onboarding@resend.dev>',
      replyTo: payload.email,
      subject: `New Contact Form Submission: ${payload.subject}`,
      html: buildContactEmail(payload)
    })

    if (error) {
      console.error('Resend API error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to send email: ${error.message}`
      })
    }

    console.log('Email sent successfully:', data)
    return { ok: true, data }
    
  } catch (error) {
    console.error('Error in contact form submission:', error)
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Internal server error: ${error.message}`
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'An unknown error occurred'
    })
  }
})
