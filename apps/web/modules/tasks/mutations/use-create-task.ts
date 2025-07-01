import { useMutation, MutationHookOptions } from '@apollo/client';
import { graphql, CreateTaskMutation } from '../../../graphql';


export const mutation = graphql(`
mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      status
      label
      priority
      projectId
      assigneeId
      updatedAt
    }
  }
`);

export const useCreateTask = (
  options?: MutationHookOptions<CreateTaskMutation>,
) => useMutation<CreateTaskMutation>(mutation, options);
