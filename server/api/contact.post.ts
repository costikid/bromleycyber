import { defineEventHandler, readBody, createError } from 'h3'
import { Resend } from 'resend'

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
    const runtimeConfig = useRuntimeConfig()
    
    console.log('Runtime config:', {
      hasResendKey: !!runtimeConfig.resendApiKey,
      notificationEmail: runtimeConfig.notificationEmail
    })

    if (!runtimeConfig.resendApiKey) {
      console.error('Resend API key is missing')
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Email service not configured' 
      })
    }

    const recipient = runtimeConfig.notificationEmail
    if (!recipient || typeof recipient !== 'string') {
      console.error('Notification email is not properly configured')
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Notification email not configured' 
      })
    }

    const payload = await readBody<ContactSubmission>(event)
    console.log('Received payload:', JSON.stringify(payload, null, 2))

    if (!payload) {
      console.error('No payload received')
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Missing payload' 
      })
    }

    const requiredFields: Array<keyof ContactSubmission> = ['name', 'email', 'subject', 'message']
    for (const field of requiredFields) {
      if (!payload[field]) {
        console.error(`Missing required field: ${field}`)
        throw createError({ 
          statusCode: 400, 
          statusMessage: `Missing required field: ${field}` 
        })
      }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(payload.email)) {
      console.error(`Invalid email format: ${payload.email}`)
      throw createError({ 
        statusCode: 400, 
        statusMessage: 'Invalid email address' 
      })
    }

    console.log('Sending email via Resend...')
    const resend = new Resend(runtimeConfig.resendApiKey)
    const { data, error } = await resend.emails.send({
      from: 'Bromley Cyber Contact <onboarding@resend.dev>',
      to: recipient,
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
