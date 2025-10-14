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
  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig.resendApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  const recipient = runtimeConfig.notificationEmail
  if (!recipient || typeof recipient !== 'string') {
    throw createError({ statusCode: 500, statusMessage: 'Notification email not configured' })
  }

  const payload = await readBody<ContactSubmission>(event)

  if (!payload) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payload' })
  }

  const requiredFields: Array<keyof ContactSubmission> = ['name', 'email', 'subject', 'message']
  for (const field of requiredFields) {
    if (!payload[field]) {
      throw createError({ statusCode: 400, statusMessage: `Missing required field: ${field}` })
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(payload.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const resend = new Resend(runtimeConfig.resendApiKey)

  await resend.emails.send({
    from: 'Bromley Cyber Contact <onboarding@resend.dev>',
    to: recipient,
    replyTo: payload.email,
    subject: `New Contact Form Submission: ${payload.subject}`,
    html: buildContactEmail(payload)
  })

  return { ok: true }
})
