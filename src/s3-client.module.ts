import { type DynamicModule, Module } from '@nestjs/common'
import { Options, S3ClientService } from './s3-client.service'
import { ZodOptionsSchema } from './schema'

@Module({})
export class S3ClientModule {
  static forRootAsync(options: Options): DynamicModule {
    return {
      module: S3ClientModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: options,
        },
        {
          provide: S3ClientService,
          useFactory: async (options) => {
            await ZodOptionsSchema.parse(options)

            return new S3ClientService(options)
          },
          inject: ['OPTIONS'],
        },
      ],
      exports: [S3ClientService],
    }
  }
}
