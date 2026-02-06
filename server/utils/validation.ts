import { createError } from 'h3'

/**
 * Validates email format using standard regex pattern
 * @throws H3Error with 400 status if email is invalid
 */
export const validateEmail = (email: string): void => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Invalid email address' 
    })
  }
}

/**
 * Validates that all required fields are present in payload
 * @throws H3Error with 400 status if any required field is missing
 */
export const validateRequiredFields = <T extends Record<string, any>>(
  payload: T,
  fields: Array<keyof T>
): void => {
  for (const field of fields) {
    if (!payload[field]) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: `Missing required field: ${String(field)}` 
      })
    }
  }
}
