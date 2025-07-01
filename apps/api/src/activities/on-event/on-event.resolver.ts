import { Resolver, Subscription } from '@nestjs/graphql';
import { TrackerService } from '../../shared';
import { Activity } from '../activity.type';

@Resolver(() => Activity)
export class OnEventResolver {
  constructor(private readonly trackerService: TrackerService) {}
  @Subscription(() => Activity, {
    name: 'onEvent',
    resolve: (payload: Activity) => {
      return payload;
    },
  })
  onEvent() {
    return this.trackerService.subscrib();
  }
}
