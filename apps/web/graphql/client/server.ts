import { ApolloLink } from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { createUploadLink } from 'apollo-upload-client';
import { headers } from 'next/headers';

export const getClient = async () => {
  const headersInstance = await headers();

  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'include',
    headers: {
      'Apollo-Require-Preflight': 'true',
      cookie: headersInstance.get('cookie') ?? '',
    },
  }) as unknown as ApolloLink;

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({}),
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
