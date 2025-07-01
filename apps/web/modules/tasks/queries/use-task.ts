import { useQuery, QueryHookOptions } from '@apollo/client';
import {
  TaskQuery,
  TaskQueryVariables,
} from '../../../graphql';
import { query } from './task.query';

export const useTask = (
  options: QueryHookOptions<TaskQuery, TaskQueryVariables>,
) => useQuery<TaskQuery, TaskQueryVariables>(query, options);
