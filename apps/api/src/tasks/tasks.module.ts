import { Module } from '@nestjs/common';
import { TasksModule as ServerTasksModule } from '@server/tasks';
import { TeamModule } from '@server/team';
import { ProjectsModule } from '@server/projects';
import { TasksResolver } from './tasks/tasks.resolver';
import { DeleteTasksResolver } from './delete-task/delete-tasks.resolver';
import { UpdateTaskResolver } from './update-task/update-task.resolver';
import { CreateTaskResolver } from './create-task/create-task.resolver';
import { CopyTaskResolver } from './copy-task/copy-task.resolver';
import { TaskResolver } from './task/task.resolver';
import { TaskFieldsResolver } from './task-fields';


@Module({
  imports: [ServerTasksModule, TeamModule, ProjectsModule],
  providers: [
    TasksResolver,
    DeleteTasksResolver,
    UpdateTaskResolver,
    CreateTaskResolver,
    TaskResolver,
    TaskFieldsResolver,
    CopyTaskResolver,
  ],
})
export class TasksModule {}
