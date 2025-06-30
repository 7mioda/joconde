import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Project')
export class Project {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The title of the project' })
  title: string;

  @Field({ description: 'The description of the project' })
  description: string;

  @Field({ description: 'The status of the project' })
  status: string;

  @Field({ description: 'The owner ID of the project' })
  ownerId: string;

  @Field(() => Date, { description: 'The last date the project was updated' })
  updatedAt: Date;
}
