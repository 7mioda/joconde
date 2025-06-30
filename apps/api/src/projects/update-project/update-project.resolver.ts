import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectService } from '@server/projects';
import { UpdateProjectInput } from './update-project.input';
import { Project } from '../project.type';

@Resolver(() => Project)
export class UpdateProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('input') input: UpdateProjectInput,
  ) {
    return this.projectService.updateProject(id, input);
  }
}
