export const USER_VALIDATON_MESSAGE = {
  EMAIL_NOT_VALID: 'The email is not valid',
  USER_NAME_NOT_VALID: {
    MIN_LENGTH: 'Min name length is 3 chars',
    MAX_LENGTH: 'Max name length is 50 chars',
  },
  PASSWORD_LENGTH_NOT_VALID: {
    MIN_LENGTH: 'Min password length is 6 chars',
    MAX_LENGTH: 'Max password length is 12 chars',
  }
} as const;
