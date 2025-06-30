/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateMemberInput = {
  /** The email of the member */
  email: Scalars['String']['input'];
  /** The first name of the member */
  firstname: Scalars['String']['input'];
  /** The last name of the member */
  lastname: Scalars['String']['input'];
  /** The role of the member */
  role: Scalars['String']['input'];
  /** The status of the member */
  status?: InputMaybe<Scalars['String']['input']>;
  /** The team ID of the member */
  teamId: Scalars['String']['input'];
};

export type DeleteMemberOutput = {
  __typename?: 'DeleteMemberOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteProjectOutput = {
  __typename?: 'DeleteProjectOutput';
  success: Scalars['Boolean']['output'];
};

export type DeleteTaskOutput = {
  __typename?: 'DeleteTaskOutput';
  success: Scalars['Boolean']['output'];
};

export type Member = {
  __typename?: 'Member';
  /** The avatar of the member */
  avatar: Scalars['String']['output'];
  /** The email of the member */
  email: Scalars['String']['output'];
  /** The first name of the member */
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The last name of the member */
  lastname: Scalars['String']['output'];
  /** The name of the member */
  name: Scalars['String']['output'];
  /** The last date the member was updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMember: Member;
  deleteMember: DeleteMemberOutput;
  deleteProject: DeleteProjectOutput;
  deleteTask: DeleteTaskOutput;
  updateMember: Member;
  updateProject: Project;
  updateTask: Task;
};


export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


export type MutationDeleteMemberArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateMemberArgs = {
  id: Scalars['String']['input'];
  input: UpdateMemberInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['String']['input'];
  input: UpdateTaskInput;
};

export type Project = {
  __typename?: 'Project';
  /** The description of the project */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The owner ID of the project */
  ownerId: Scalars['String']['output'];
  /** The status of the project */
  status: Scalars['String']['output'];
  /** The title of the project */
  title: Scalars['String']['output'];
  /** The last date the project was updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  members: Array<Member>;
  projects: Array<Project>;
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  /** The assignee ID of the task */
  assigneeId: Scalars['String']['output'];
  /** The description of the task */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The label of the task */
  label: Scalars['String']['output'];
  /** The project ID of the task */
  projectId: Scalars['String']['output'];
  /** The status of the task */
  status: Scalars['String']['output'];
  /** The title of the task */
  title: Scalars['String']['output'];
  /** The last date the category was updated */
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateMemberInput = {
  /** The email of the member */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the member */
  firstname?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the member */
  lastname?: InputMaybe<Scalars['String']['input']>;
  /** The role of the member */
  role?: InputMaybe<Scalars['String']['input']>;
  /** The status of the member */
  status?: InputMaybe<Scalars['String']['input']>;
  /** The team ID of the member */
  teamId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  /** The description of the project */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the project */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The owner ID of the project */
  ownerId?: InputMaybe<Scalars['String']['input']>;
  /** The status of the project */
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  /** The description of the task */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The label of the task */
  label?: InputMaybe<Scalars['String']['input']>;
  /** The priority of the task */
  priority?: InputMaybe<Scalars['String']['input']>;
  /** The project ID of the task */
  projectId?: InputMaybe<Scalars['String']['input']>;
  /** The status of the task */
  status?: InputMaybe<Scalars['String']['input']>;
  /** The title of the task */
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, description: string, status: string, ownerId: string, updatedAt: any }> };

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string, status: string, label: string, description: string, assigneeId: string }> };

export type MembersQueryVariables = Exact<{ [key: string]: never; }>;


export type MembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'Member', email: string, id: string, name: string, avatar: string, firstname: string, lastname: string, updatedAt: any }> };


export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const TasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}}]}}]}}]} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;