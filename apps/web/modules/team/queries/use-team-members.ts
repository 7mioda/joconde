'use client';

import { useQuery, QueryHookOptions } from '@apollo/client';
import {
  MembersQuery,
  MembersQueryVariables,
} from '../../../graphql';
import { query } from './team-members.query';

export const useTeamMembers = (
  options: QueryHookOptions<MembersQuery, MembersQueryVariables>,
) => useQuery<MembersQuery, MembersQueryVariables>(query, options);
