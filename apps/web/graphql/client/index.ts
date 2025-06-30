import { BatchHttpLink } from '@apollo/client/link/batch-http';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  const httpLink = new BatchHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    batchMax: 40,
    batchInterval: 20,
    credentials: 'include',
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Task: {
          merge: false,
        },
      },
    }),
    link: httpLink,
  });
});
