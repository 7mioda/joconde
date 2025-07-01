import { ApolloLink } from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

console.log('process.env.NEXT_PUBLIC_GRAPHQL_URI', process.env.NEXT_PUBLIC_GRAPHQL_URI);

export const getClient = () => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  }) as unknown as ApolloLink;


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
