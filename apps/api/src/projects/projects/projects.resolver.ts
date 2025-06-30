import { Query, Resolver } from '@nestjs/graphql';
import { ProjectService } from '@server/projects';
import { Project } from '../project.type';

@Resolver(() => [Project])
export class ProjectsResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => [Project])
  async projects() {
    return this.projectService.getAllProjects();
  }
}
