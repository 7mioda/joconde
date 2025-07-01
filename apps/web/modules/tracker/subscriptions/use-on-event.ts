import { useSubscription, SubscriptionHookOptions } from '@apollo/client';
import { graphql, OnEventSubscription } from '../../../graphql';

export const query = graphql(`
  subscription OnEvent {
    onEvent {
      title
      type
      description
      timestamp
    }
  }
`);

export const useOnEvent = (
  options: SubscriptionHookOptions<OnEventSubscription>,
) =>
  useSubscription<
  OnEventSubscription,
    SubscriptionHookOptions<OnEventSubscription>
  >(query, options);
