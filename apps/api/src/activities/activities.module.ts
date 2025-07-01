import { Module } from '@nestjs/common';
import { OnEventResolver } from './on-event/on-event.resolver';

@Module({
  imports: [],
  providers: [OnEventResolver],
})
export class ActivitiesModule {}
