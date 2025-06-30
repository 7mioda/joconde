import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberService } from '@server/team';
import { CreateMemberInput } from './create-member.input';
import { Member } from '../member.type';

@Resolver(() => Member)
export class CreateMemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  async createMember(@Args('input') input: CreateMemberInput) {
    return this.memberService.createMember(input);
  }
}
