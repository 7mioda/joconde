import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Task')
export class Task {
  @Field(() => ID)
  id: string;

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

  @Field(() => Date, { description: 'The last date the category was updated' })
  updatedAt: Date;
}
