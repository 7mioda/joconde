import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateMemberInput')
export class UpdateMemberInput {
  @Field({ description: 'The first name of the member', nullable: true })
  firstname?: string;

  @Field({ description: 'The last name of the member', nullable: true })
  lastname?: string;

  @Field({ description: 'The email of the member', nullable: true })
  email?: string;

  @Field({ description: 'The role of the member', nullable: true })
  role?: string;

  @Field({ description: 'The team ID of the member', nullable: true })
  teamId?: string;

  @Field({ description: 'The status of the member', nullable: true })
  status?: string;
}
