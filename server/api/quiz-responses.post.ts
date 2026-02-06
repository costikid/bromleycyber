import { defineEventHandler, createError, readBody } from 'h3'
import { createEmailService } from '~/server/utils/emailService'
import { validateEmail, validateRequiredFields } from '~/server/utils/validation'

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
  const emailService = createEmailService()

  const body = await readBody<QuizSubmission>(event)

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission payload' })
  }

  validateRequiredFields(body, ['score', 'firstName', 'lastName', 'email'])
  validateEmail(body.email)

  await emailService.send({
    from: 'Bromley Cyber Quiz <onboarding@resend.dev>',
    replyTo: body.email,
    subject: `New Security Quiz Submission (${body.score}/3)`,
    html: formatQuizEmail(body)
  })

  return { ok: true }
})
