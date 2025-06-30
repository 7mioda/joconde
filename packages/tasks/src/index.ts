import { Module } from '@nestjs/common';
import { TaskService } from './application/services/task.service';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository';
import { TaskRepository } from './domain';
export * from './application/services/task.service';


@Module({
  imports: [],
  controllers: [],
  providers: [
    TaskService,
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository,
    },
  ],
  exports: [TaskService],
})
export class TasksModule {}