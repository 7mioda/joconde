import { ApolloLink } from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createUploadLink } from 'apollo-upload-client';

console.log('process.env.NEXT_PUBLIC_GRAPHQL_URI', process.env.NEXT_PUBLIC_GRAPHQL_URI);

export const getClient = () => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  }) as unknown as ApolloLink;


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
        : httpLink,
  });
};
