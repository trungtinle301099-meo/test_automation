import * as crypto from 'crypto';
/**
 * Generates a random integer between min and max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a unique email address using the current timestamp.
 * @param prefix - Optional prefix for the local part of the email
 * @param domain - Optional mail domain (defaults to 'mailtest.com')
 */
export function generateUniqueEmail(
  prefix: string = 'user',
  domain: string = 'mailtest.com'
): string {
  return `${prefix}_${crypto.randomUUID().split('-')[0]}@${domain}`;
}

/**
 * Pauses execution for the given number of milliseconds.
 * Use sparingly – prefer Playwright's built-in waiting mechanisms.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateUniqueUserName(prefix: string = 'user'): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const chars = letters + numbers;

  let randomPart = '';

  for (let i = 0; i < 15 - prefix.length; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  const result = `${prefix}${randomPart}`;

  return result.substring(0, 15);
}
