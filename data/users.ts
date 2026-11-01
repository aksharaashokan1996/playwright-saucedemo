/**
 * Test users. Usernames are public demo accounts; the password is never
 * stored in code — it is read from the SAUCE_PASSWORD environment variable.
 */
export function getPassword(): string {
  const password = process.env.SAUCE_PASSWORD;
  if (!password) {
    throw new Error(
      'SAUCE_PASSWORD is not set. Copy .env.example to .env and set it, or export it in your shell / CI secrets.',
    );
  }
  return password;
}

export const users = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
} as const;

export const invalidPassword = 'definitely_not_the_password';
