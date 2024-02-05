export enum ApplicationServiceURL {
  Users = 'http://localhost:4546/api/auth',
  Posts = 'http://localhost:4000/api/posts',
  FileVault = 'http://localhost:3335/api/files',
}

export const HTTP_CLIENT_AVAILABLE_VALUE = {
  MAX_REDIRECTS: 5,
  CLIENT_TIMEOUT: 5000,
} as const;
