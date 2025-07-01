import { useMutation, MutationHookOptions } from '@apollo/client';
import { graphql, UpdateTaskMutation } from '../../../graphql';


export const mutation = graphql(`
mutation UpdateTask($updateTaskId: String!, $input: UpdateTaskInput!) {
  updateTask(id: $updateTaskId, input: $input) {
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

export const useUpdateTask = (
  options?: MutationHookOptions<UpdateTaskMutation>,
) => useMutation<UpdateTaskMutation>(mutation, options);
