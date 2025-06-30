import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateMemberInput')
export class CreateMemberInput {
  @Field({ description: 'The first name of the member' })
  firstname: string;

  @Field({ description: 'The last name of the member' })
  lastname: string;

  @Field({ description: 'The email of the member' })
  email: string;

  @Field({ description: 'The role of the member' })
  role: string;

  @Field({ description: 'The team ID of the member' })
  teamId: string;

  @Field({ description: 'The status of the member', nullable: true })
  status?: string;
} 