import { defineEventHandler, createError, readBody } from 'h3'
import { Resend } from 'resend'

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
  const runtimeConfig = useRuntimeConfig()

  const apiKey = runtimeConfig.resendApiKey as string | undefined
  if (typeof apiKey !== 'string' || apiKey.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }

  const recipient = runtimeConfig.notificationEmail as string | undefined
  if (typeof recipient !== 'string' || recipient.length === 0) {
    throw createError({ statusCode: 500, statusMessage: 'Notification email not configured' })
  }

  const payload = await readBody<WebsiteRequest>(event)

  if (!payload || typeof payload !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission payload' })
  }

  const requiredFields: Array<keyof WebsiteRequest> = ['firstName', 'lastName', 'email', 'description']
  for (const field of requiredFields) {
    if (!payload[field]) {
      throw createError({ statusCode: 400, statusMessage: `Missing required field: ${field}` })
    }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(payload.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const resend = new Resend(apiKey)

  await resend.emails.send({
    from: 'Bromley Cyber <onboarding@resend.dev>',
    to: recipient,
    replyTo: payload.email,
    subject: 'New Secure Website Request',
    html: renderWebsiteRequestEmail(payload)
  })

  return { ok: true }
})
