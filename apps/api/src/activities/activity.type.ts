import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class Activity {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  timestamp: string;

  @Field(() => GraphQLJSON)
  payload: any;
}
