import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'

export type Options = {
  region: string
  accessKeyId: string
  secretAccessKey: string
}

type DeleteArgs = {
  Bucket: string
  Key: string
}

type GetArgs = {
  Bucket: string
  Key: string
}

type SendArgs = DeleteArgs & {
  Body: Buffer
  ContentType?: string
}

type SignedUrlArgs = DeleteArgs & {
  expiresIn?: number
}

@Injectable()
export class S3ClientService {
  private readonly s3Client: S3Client

  constructor({ region, accessKeyId, secretAccessKey }: Options) {
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }

  send = ({
    Bucket,
    Key,
    Body,
    ContentType,
  }: SendArgs): Promise<PutObjectCommandOutput> => {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body,
        ContentType,
      }),
    )
  }

  delete = ({
    Bucket,
    Key,
  }: DeleteArgs): Promise<DeleteObjectCommandOutput> => {
    return this.s3Client.send(
      new DeleteObjectCommand({
        Bucket,
        Key,
      }),
    )
  }

  get = async ({ Bucket, Key }: GetArgs): Promise<GetObjectCommandOutput> => {
    return this.s3Client.send(new GetObjectCommand({ Bucket, Key }))
  }

  signedUrl = ({
    Bucket,
    Key,
    expiresIn = 300,
  }: SignedUrlArgs): Promise<string> => {
    return getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket,
        Key,
      }),
      { expiresIn },
    )
  }
}
