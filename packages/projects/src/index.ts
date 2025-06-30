import { Module } from '@nestjs/common';
import { ProjectService } from './application/services/project.service';
import { PrismaProjectRepository } from './infrastructure/repositories/prisma-project.repository';
import { ProjectRepository } from './domain';
export * from './application/services/project.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    ProjectService,
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [ProjectService],
})
export class ProjectsModule {} 