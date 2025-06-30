import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProjectService } from '@server/projects';
import { DeleteProjectOutput } from './delete-project.output';

@Resolver(() => DeleteProjectOutput)
export class DeleteProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => DeleteProjectOutput)
  async deleteProject(@Args('id') id: string) {
    try {
      await this.projectService.deleteProject(id);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
