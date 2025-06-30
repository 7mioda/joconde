import { Module } from '@nestjs/common';
import { TasksModule as ServerTasksModule } from '@server/tasks';
import { TasksResolver } from './tasks/tasks.resolver';
import { DeleteTasksResolver } from './delete-task/delete-tasks.resolver';
import { UpdateTaskResolver } from './update-task/update-task.resolver';

@Module({
  imports: [ServerTasksModule],
  providers: [TasksResolver, DeleteTasksResolver, UpdateTaskResolver],
})
export class TasksModule {}
