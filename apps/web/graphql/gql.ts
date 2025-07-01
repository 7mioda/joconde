/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery Projects {\n  projects {\n    id\n    title\n    description\n    status\n    ownerId\n    updatedAt\n  }\n}\n": typeof types.ProjectsDocument,
    "\nmutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      status\n      label\n      priority\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n": typeof types.CreateTaskDocument,
    "\nmutation DeleteTask($deleteTaskId: String!) {\n  deleteTask(id: $deleteTaskId) {\n    success\n  }\n}\n": typeof types.DeleteTaskDocument,
    "\nmutation UpdateTask($updateTaskId: String!, $input: UpdateTaskInput!) {\n  updateTask(id: $updateTaskId, input: $input) {\n    id\n    title\n    priority\n    description\n    status\n    label\n    projectId\n    assigneeId\n    updatedAt\n  }\n}\n": typeof types.UpdateTaskDocument,
    "\nquery Task($taskId: String!) {\n    task(taskId: $taskId) {\n      id\n      title\n      priority\n      description\n      status\n      label\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n": typeof types.TaskDocument,
    "\n  query Tasks {\n    tasks {\n      id\n      title\n      status\n      label\n      priority\n      description\n      assigneeId\n      project {\n        id \n        title\n      }\n      assignee {\n        id\n        name\n        avatar\n      }\n    }\n  }\n": typeof types.TasksDocument,
    "\nquery Members {\n  members {\n    email\n    id\n    name\n    avatar\n    firstname\n    lastname\n    updatedAt\n  }\n}\n": typeof types.MembersDocument,
    "\n  subscription OnEvent {\n    onEvent {\n      title\n      type\n      description\n      timestamp\n    }\n  }\n": typeof types.OnEventDocument,
};
const documents: Documents = {
    "\nquery Projects {\n  projects {\n    id\n    title\n    description\n    status\n    ownerId\n    updatedAt\n  }\n}\n": types.ProjectsDocument,
    "\nmutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      status\n      label\n      priority\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n": types.CreateTaskDocument,
    "\nmutation DeleteTask($deleteTaskId: String!) {\n  deleteTask(id: $deleteTaskId) {\n    success\n  }\n}\n": types.DeleteTaskDocument,
    "\nmutation UpdateTask($updateTaskId: String!, $input: UpdateTaskInput!) {\n  updateTask(id: $updateTaskId, input: $input) {\n    id\n    title\n    priority\n    description\n    status\n    label\n    projectId\n    assigneeId\n    updatedAt\n  }\n}\n": types.UpdateTaskDocument,
    "\nquery Task($taskId: String!) {\n    task(taskId: $taskId) {\n      id\n      title\n      priority\n      description\n      status\n      label\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n": types.TaskDocument,
    "\n  query Tasks {\n    tasks {\n      id\n      title\n      status\n      label\n      priority\n      description\n      assigneeId\n      project {\n        id \n        title\n      }\n      assignee {\n        id\n        name\n        avatar\n      }\n    }\n  }\n": types.TasksDocument,
    "\nquery Members {\n  members {\n    email\n    id\n    name\n    avatar\n    firstname\n    lastname\n    updatedAt\n  }\n}\n": types.MembersDocument,
    "\n  subscription OnEvent {\n    onEvent {\n      title\n      type\n      description\n      timestamp\n    }\n  }\n": types.OnEventDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Projects {\n  projects {\n    id\n    title\n    description\n    status\n    ownerId\n    updatedAt\n  }\n}\n"): (typeof documents)["\nquery Projects {\n  projects {\n    id\n    title\n    description\n    status\n    ownerId\n    updatedAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      status\n      label\n      priority\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\nmutation CreateTask($input: CreateTaskInput!) {\n    createTask(input: $input) {\n      id\n      title\n      description\n      status\n      label\n      priority\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation DeleteTask($deleteTaskId: String!) {\n  deleteTask(id: $deleteTaskId) {\n    success\n  }\n}\n"): (typeof documents)["\nmutation DeleteTask($deleteTaskId: String!) {\n  deleteTask(id: $deleteTaskId) {\n    success\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateTask($updateTaskId: String!, $input: UpdateTaskInput!) {\n  updateTask(id: $updateTaskId, input: $input) {\n    id\n    title\n    priority\n    description\n    status\n    label\n    projectId\n    assigneeId\n    updatedAt\n  }\n}\n"): (typeof documents)["\nmutation UpdateTask($updateTaskId: String!, $input: UpdateTaskInput!) {\n  updateTask(id: $updateTaskId, input: $input) {\n    id\n    title\n    priority\n    description\n    status\n    label\n    projectId\n    assigneeId\n    updatedAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Task($taskId: String!) {\n    task(taskId: $taskId) {\n      id\n      title\n      priority\n      description\n      status\n      label\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n"): (typeof documents)["\nquery Task($taskId: String!) {\n    task(taskId: $taskId) {\n      id\n      title\n      priority\n      description\n      status\n      label\n      projectId\n      assigneeId\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tasks {\n    tasks {\n      id\n      title\n      status\n      label\n      priority\n      description\n      assigneeId\n      project {\n        id \n        title\n      }\n      assignee {\n        id\n        name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tasks {\n    tasks {\n      id\n      title\n      status\n      label\n      priority\n      description\n      assigneeId\n      project {\n        id \n        title\n      }\n      assignee {\n        id\n        name\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Members {\n  members {\n    email\n    id\n    name\n    avatar\n    firstname\n    lastname\n    updatedAt\n  }\n}\n"): (typeof documents)["\nquery Members {\n  members {\n    email\n    id\n    name\n    avatar\n    firstname\n    lastname\n    updatedAt\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription OnEvent {\n    onEvent {\n      title\n      type\n      description\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  subscription OnEvent {\n    onEvent {\n      title\n      type\n      description\n      timestamp\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;