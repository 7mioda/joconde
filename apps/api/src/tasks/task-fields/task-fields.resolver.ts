import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from '../task.type';
import { Project } from '../../projects/project.type';
import { Member } from '../../teams/member.type';
import { ProjectService } from '@server/projects';
import { MemberService } from '@server/team';

@Resolver(() => Task)
export class TaskFieldsResolver {
  constructor(
    private readonly memberService: MemberService,
    private readonly projectService: ProjectService,
  ) {}

  @ResolveField(() => Member, {
    description: 'Task assignee',
    nullable: false,
  })
  async assignee(@Parent() task: Task) {
    return this.memberService.getMemberById(task.assigneeId);
  }

  @ResolveField(() => Project, { description: 'Task project', nullable: false })
  async project(@Parent() task: Task) {
    return this.projectService.getProjectById(task.projectId);
  }
}
