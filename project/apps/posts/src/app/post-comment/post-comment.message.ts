export const POST_COMMENT_VALIDATION_MESSAGE = {
  MESSAGE: {
    MIN_LENGTH: 'Min message length is 10 chars',
    MAX_LENGTH: 'Max message length is 300 chars',
  },
  USER_ID: {
    NOT_VALID: 'userId must be valid mongo id'
  }
} as const;
