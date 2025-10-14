import { defineEventHandler, createError, readBody } from 'h3'
import { Resend } from 'resend'

interface QuizSubmission {
  hasWebsite: boolean
  websiteUrl?: string
  tool?: string
  score: number
  firstName: string
  lastName: string
  email: string
  phone?: string
}

const formatQuizEmail = (submission: QuizSubmission) => {
  const lines = [
    `<p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>`,
    `<p><strong>Email:</strong> ${submission.email}</p>`,
    `<p><strong>Phone:</strong> ${submission.phone || 'N/A'}</p>`,
    `<p><strong>Has Website:</strong> ${submission.hasWebsite ? 'Yes' : 'No'}</p>`,
    `<p><strong>Website URL:</strong> ${submission.websiteUrl || 'N/A'}</p>`,
    `<p><strong>Platform:</strong> ${submission.tool || 'N/A'}</p>`,
    `<p><strong>Security Score:</strong> ${submission.score}/3</p>`
  ]

  return `<div>${lines.join('')}</div>`
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

  const body = await readBody<QuizSubmission>(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission payload' })
  }

  const requiredFields: Array<keyof QuizSubmission> = ['score', 'firstName', 'lastName', 'email']
  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({ statusCode: 400, statusMessage: `Missing required field: ${field}` })
    }
  }

  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const resend = new Resend(apiKey)

  await resend.emails.send({
    from: 'Bromley Cyber Quiz <onboarding@resend.dev>',
    to: recipient,
    replyTo: body.email,
    subject: `New Security Quiz Submission (${body.score}/3)`,
    html: formatQuizEmail(body)
  })

  return { ok: true }
})
