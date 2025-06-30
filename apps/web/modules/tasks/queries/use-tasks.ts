import { useQuery, QueryHookOptions } from '@apollo/client';
import {
  TasksQuery,
  TasksQueryVariables,
} from '../../../graphql';
import { query } from './tasks.query';

export const useTasks = (
  options: QueryHookOptions<TasksQuery, TasksQueryVariables>,
) => useQuery<TasksQuery, TasksQueryVariables>(query, options);
