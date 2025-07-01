import { useMutation, MutationHookOptions } from '@apollo/client';
import { graphql, CopyTaskMutation } from '../../../graphql';


export const mutation = graphql(`
mutation CopyTask($taskId: String!, $input: CopyTaskInput!) {
  copyTask(taskId: $taskId, input: $input) {
    id
    title
    priority
    description
    status
    label
    projectId
    assigneeId
    updatedAt
    assignee {
      id
      name
    }
    project {
      id
      title
    }
  }
}
`);

export const useCopyTask = (
  options?: MutationHookOptions<CopyTaskMutation>,
) => useMutation<CopyTaskMutation>(mutation, options);
