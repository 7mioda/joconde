import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteProjectOutput {
  @Field(() => Boolean)
  success: boolean;
}
