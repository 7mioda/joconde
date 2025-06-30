import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MemberService } from '@server/team';
import { DeleteMemberOutput } from './delete-member.output';

@Resolver(() => DeleteMemberOutput)
export class DeleteMemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => DeleteMemberOutput)
  async deleteMember(@Args('id') id: string) {
    try {
      await this.memberService.deleteMember(id);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
} 