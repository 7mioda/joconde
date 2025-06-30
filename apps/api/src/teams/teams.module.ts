import { Module } from '@nestjs/common';
import { TeamModule as ServerTeamModule } from '@server/team';
import { MembersResolver } from './members/members.resolver';
import { CreateMemberResolver } from './create-member/create-member.resolver';
import { UpdateMemberResolver } from './update-member/update-member.resolver';
import { DeleteMemberResolver } from './delete-member/delete-member.resolver';

@Module({
  imports: [ServerTeamModule],
  providers: [
    MembersResolver,
    CreateMemberResolver,
    UpdateMemberResolver,
    DeleteMemberResolver,
  ],
})
export class TeamsModule {}
