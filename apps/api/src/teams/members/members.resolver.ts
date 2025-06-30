import { Query, Resolver } from '@nestjs/graphql';
import { MemberService } from '@server/team';
import { Member } from '../member.type';

@Resolver(() => [Member])
export class MembersResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => [Member])
  async members() {
    return this.memberService.getAllMembers();
  }
}
