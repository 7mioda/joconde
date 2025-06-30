import { ApolloLink } from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

export const getClient = () => {
  const httpUploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  }) as unknown as ApolloLink;

  const httpBatchLink = new BatchHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  }) as unknown as ApolloLink;

  const httpLink = ApolloLink.split(
    (operation) => {
      return operation.getContext().batch;
    },
    httpBatchLink,
    httpUploadLink,
  );

  const wsLink = new GraphQLWsLink(
    createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_URI ?? '',
    }),
  );

  const link = ApolloLink.split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {},
    }),
    link:
      (global?.window as unknown) === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : link,
  });
};
