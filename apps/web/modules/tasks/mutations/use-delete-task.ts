import { useMutation, MutationHookOptions } from '@apollo/client';
import { graphql, DeleteTaskMutation } from '../../../graphql';


export const mutation = graphql(`
mutation DeleteTask($deleteTaskId: String!) {
  deleteTask(id: $deleteTaskId) {
    success
  }
}
`);

export const useDeleteTask = (
  options?: MutationHookOptions<DeleteTaskMutation>,
) => useMutation<DeleteTaskMutation>(mutation, options);
