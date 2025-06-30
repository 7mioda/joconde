import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMemberOutput {
  @Field(() => Boolean)
  success: boolean;
} 