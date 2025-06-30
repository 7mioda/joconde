import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberService } from '@server/team';
import { UpdateMemberInput } from './update-member.input';
import { Member } from '../member.type';

@Resolver(() => Member)
export class UpdateMemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)
  async updateMember(
    @Args('id') id: string,
    @Args('input') input: UpdateMemberInput,
  ) {
    return this.memberService.updateMember(id, input);
  }
}
