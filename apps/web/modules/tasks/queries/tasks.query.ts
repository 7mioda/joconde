import { graphql } from '../../../graphql';

export const query = graphql(`
  query Tasks {
    tasks {
      id
      title
      status
      label
      priority
      description
      assigneeId
      project {
        id 
        title
      }
      assignee {
        id
        name
        avatar
      }
    }
  }
`);
