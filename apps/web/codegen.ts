import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

console.log('process.env.NEXT_PUBLIC_GRAPHQL_URI', process.env.NEXT_PUBLIC_GRAPHQL_URI);

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  documents: [
    './**/*.graphql',
    './**/*.tsx',
    './**/*.ts',
  ],
  ignoreNoDocuments: true,
  generates: {
    './graphql/': {
      preset: 'client',
    },
  },
};
export default config;
