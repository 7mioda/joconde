import { Module } from '@nestjs/common';
import { ProjectsModule as ServerProjectsModule } from '@server/projects';
import { ProjectsResolver } from './projects/projects.resolver';
import { DeleteProjectResolver } from './delete-project/delete-project.resolver';
import { UpdateProjectResolver } from './update-project/update-project.resolver';

@Module({
  imports: [ServerProjectsModule],
  providers: [ProjectsResolver, DeleteProjectResolver, UpdateProjectResolver],
})
export class ProjectsModule {}
