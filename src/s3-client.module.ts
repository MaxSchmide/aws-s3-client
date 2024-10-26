import { type DynamicModule, Module } from '@nestjs/common'
import { S3ClientService } from './s3-client.service'
import { DefaultOptions } from './types'

@Module({})
export class S3ClientModule {
  static forRootAsync<TOptions extends DefaultOptions>(
    options: TOptions,
  ): DynamicModule {
    return {
      module: S3ClientModule,
      providers: [
        {
          provide: S3ClientService<TOptions>,
          useFactory: () => {
            return new S3ClientService(options)
          },
        },
      ],
      exports: [S3ClientService],
    }
  }
}
