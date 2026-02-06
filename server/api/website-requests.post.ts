import { defineEventHandler, createError, readBody } from 'h3'
import { createEmailService } from '~/server/utils/emailService'
import { validateEmail, validateRequiredFields } from '~/server/utils/validation'

interface WebsiteRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  description: string
}

const renderWebsiteRequestEmail = (payload: WebsiteRequest) => {
  return `
    <div>
      <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
      <p><strong>Project Description:</strong></p>
      <p>${payload.description.replace(/\n/g, '<br />')}</p>
    </div>
  `
}

export default defineEventHandler(async (event) => {
  const emailService = createEmailService()

  const payload = await readBody<WebsiteRequest>(event)

  if (!payload || typeof payload !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission payload' })
  }

  validateRequiredFields(payload, ['firstName', 'lastName', 'email', 'description'])
  validateEmail(payload.email)

  await emailService.send({
    from: 'Bromley Cyber <onboarding@resend.dev>',
    replyTo: payload.email,
    subject: 'New Secure Website Request',
    html: renderWebsiteRequestEmail(payload)
  })

  return { ok: true }
})
