import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { TrackerService } from './tracker.service';

@Global()
@Module({
  providers: [
    TrackerService,
    {
      provide: PubSub,
      useValue: new RedisPubSub({
        connection: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT as string),
        },
      }),
    },
  ],
  exports: [TrackerService],
})
export class TrackerModule {}
