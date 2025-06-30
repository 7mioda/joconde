import { graphql } from '../../../graphql';

export const query = graphql(`
query Members {
  members {
    email
    id
    name
    avatar
    firstname
    lastname
    updatedAt
  }
}
`);
