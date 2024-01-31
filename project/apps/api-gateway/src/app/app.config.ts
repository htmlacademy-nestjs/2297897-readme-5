export enum ApplicationServiceUrl {
  Users = 'http://localhost:4546/api/auth',
  Notify = 'http://localhost:4545/api',
  Posts = 'http://localhost:4000/api/posts',
  PostTags = 'http://localhost:4000/api/tags',
  FileVault = 'http://localhost:3335/api/files',
};

export const HTTP_CLIENT_AVAILABLE_VALUE = {
  MAX_REDIRECTS: 5,
  CLIENT_TIMEOUT: 5000,
} as const;
