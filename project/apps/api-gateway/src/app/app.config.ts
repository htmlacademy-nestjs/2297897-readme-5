export enum ApplicationServiceUrl {
  Users = 'http://localhost:4546',
  Notify = 'http://localhost:4545',
  Posts = 'http://localhost:4000',
  FileVault = 'http://localhost:3335',
};

export const HTTP_CLIENT_AVAILABLE_VALUE = {
  MAX_REDIRECTS: 5,
  CLIENT_TIMEOUT: 5000,
} as const;
