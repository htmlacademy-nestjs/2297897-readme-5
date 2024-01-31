export const POST_LIKE_VALIDATION_MESSAGE = {
  USER_ID: {
    NOT_VALID: 'User ID must be valid mongo ID',
  },
  POST_ID: {
    NOT_VALID: 'Post ID must be valid UUID',
  },
} as const;
