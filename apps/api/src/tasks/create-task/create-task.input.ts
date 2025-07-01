import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateTaskInput')
export class CreateTaskInput {
  @Field({ description: 'The title of the task' })
  title: string;

  @Field({ description: 'The description of the task' })
  description: string;

  @Field({ description: 'The status of the task' })
  status: string;

  @Field({ description: 'The label of the task' })
  label: string;

  @Field({ description: 'The project ID of the task' })
  projectId: string;

  @Field({ description: 'The assignee ID of the task' })
  assigneeId: string;

  @Field({ description: 'The priority of the task' })
  priority: string;
} 