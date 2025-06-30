import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateProjectInput')
export class UpdateProjectInput {
  @Field({ description: 'The name of the project', nullable: true })
  name?: string;

  @Field({ description: 'The description of the project', nullable: true })
  description?: string;

  @Field({ description: 'The status of the project', nullable: true })
  status?: string;

  @Field({ description: 'The owner ID of the project', nullable: true })
  ownerId?: string;
}
