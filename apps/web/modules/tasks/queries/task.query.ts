import { graphql } from '../../../graphql';

export const query = graphql(`
query Task($taskId: String!) {
    task(taskId: $taskId) {
      id
      title
      priority
      description
      status
      label
      projectId
      assigneeId
      updatedAt
    }
  }
`);
