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

export type DeleteTaskOutput = {
  __typename?: 'DeleteTaskOutput';
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteTask: DeleteTaskOutput;
  updateTask: Task;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['String']['input'];
  input: UpdateTaskInput;
};

export type Query = {
  __typename?: 'Query';
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

export type TasksQueryVariables = Exact<{ [key: string]: never; }>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, title: string, status: string, label: string, description: string, assigneeId: string }> };


export const TasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"assigneeId"}}]}}]}}]} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;