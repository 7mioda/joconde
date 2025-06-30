import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateTaskInput')
export class UpdateTaskInput {
  @Field({ description: 'The title of the task', nullable: true })
  title?: string;

  @Field({ description: 'The description of the task', nullable: true })
  description?: string;

  @Field({ description: 'The status of the task', nullable: true })
  status?: string;

  @Field({ description: 'The label of the task', nullable: true })
  label?: string;

  @Field({ description: 'The project ID of the task', nullable: true })
  projectId?: string;

  @Field({ description: 'The priority of the task', nullable: true })
  priority?: string;
}
