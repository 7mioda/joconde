import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

interface Event<T = any> {
  type: string;
  title: string;
  description: string;
  payload: T;
}

export const TRACKER_TOPIC = 'tracker-event';

@Injectable()
export class TrackerService {
  constructor(private readonly pubSub: PubSub) {}

  async publish<T>(event: Event<T>) {
    this.pubSub.publish(TRACKER_TOPIC, {
      ...event,
      timestamp: new Date().toISOString(),
    });
  }

  async subscrib() {
    return this.pubSub.asyncIterator(TRACKER_TOPIC);
  }
}
