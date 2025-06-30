'use client';

import { useQuery, QueryHookOptions } from '@apollo/client';
import {
  ProjectsQuery,
  ProjectsQueryVariables,
} from '../../../graphql';
import { query } from './projects.query';

export const useProjects = (
  options: QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>,
) => useQuery<ProjectsQuery, ProjectsQueryVariables>(query, options);
