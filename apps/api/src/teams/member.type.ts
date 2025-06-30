import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Member')
export class Member {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The name of the member' })
  name: string;

  @Field({ description: 'The email of the member' })
  email: string;

  @Field({ description: 'The first name of the member' })
  firstname: string;

  @Field({ description: 'The last name of the member' })
  lastname: string;

  @Field({ description: 'The avatar of the member' })
  avatar: string;

  @Field(() => Date, { description: 'The last date the member was updated' })
  updatedAt: Date;
}
