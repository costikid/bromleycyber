import { Resend } from 'resend'
import { createError } from 'h3'

export interface EmailConfig {
  apiKey: string
  recipient: string
}

export interface EmailOptions {
  from: string
  subject: string
  html: string
  replyTo?: string
}

export class EmailService {
  private resend: Resend
  private recipient: string

  constructor(config: EmailConfig) {
    this.resend = new Resend(config.apiKey)
    this.recipient = config.recipient
  }

  async send(options: EmailOptions) {
    return await this.resend.emails.send({
      to: this.recipient,
      ...options
    })
  }
}

/**
 * Creates and configures an EmailService instance from runtime config
 * @throws H3Error with 500 status if configuration is missing
 */
export const createEmailService = (): EmailService => {
  const config = useRuntimeConfig()
  
  const apiKey = config.resendApiKey as string | undefined
  if (typeof apiKey !== 'string' || apiKey.length === 0) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Email service not configured' 
    })
  }

  const recipient = config.notificationEmail as string | undefined
  if (typeof recipient !== 'string' || recipient.length === 0) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'Notification email not configured' 
    })
  }

  return new EmailService({ apiKey, recipient })
}
