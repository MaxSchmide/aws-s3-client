export type DefaultOptions = {
  region: string
  credentials?: {
    accessKeyId: string
    secretAccessKey: string
  }
  defaultBucket?: string
}

export type DefaultArgs = {
  bucket: string
  filepath: string
}

export type SendArgs = DefaultArgs & {
  buffer: Buffer
  contentType?: string
}

export type SignedUrlArgs = DefaultArgs & {
  expiresIn?: number
}
