'use client';

import { ApolloProvider } from '@apollo/client';
import { getClient } from '../graphql/client/browser';

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const client = getClient();
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
