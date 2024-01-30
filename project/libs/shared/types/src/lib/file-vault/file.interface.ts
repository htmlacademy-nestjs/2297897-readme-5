export interface File {
  id?: string;
  originalName: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
  createdAt?: string;
  updatedAt?: string;
  subDirectory: string;
}
