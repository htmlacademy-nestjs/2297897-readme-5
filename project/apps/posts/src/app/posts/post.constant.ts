export const POST_AVAILABLE_VALUE = {
  TITLE: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 50,
  },
  ANNOUNCEMENT: {
    MIN_LENGTH: 50,
    MAX_LENGTH: 255,
  },
  POST_TEXT: {
    MIN_LENGTH: 100,
    MAX_LENGTH: 1024,
  },
  QUOTE_TEXT: {
    MIN_LENGTH: 20,
    MAX_LENGTH: 300,
  },
  QUOTE_AUTHOR: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  DESCRIPTION: {
    MAX_LENGTH: 300,
  },
  TAGS: {
    MIN_COUNT: 0,
    MAX_COUNT: 8,
  }
} as const;
