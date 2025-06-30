import { graphql } from '../../../graphql';

export const query = graphql(`
  query Tasks {
    tasks {
      id
      title
      status
      label
      description
      assigneeId
    }
  }
`);
