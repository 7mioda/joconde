import { graphql } from '../../../graphql';

export const query = graphql(`
query Projects {
  projects {
    id
    title
    description
    status
    ownerId
    updatedAt
  }
}
`);
