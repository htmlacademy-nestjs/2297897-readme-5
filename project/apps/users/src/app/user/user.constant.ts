export const SALT_ROUNDS = 10;
export const USER_AVAILABLE_VALUE = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  }
} as const;
