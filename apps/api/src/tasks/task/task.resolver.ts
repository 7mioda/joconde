import { Args, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { Task } from '../task.type';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task)
  async task(@Args('taskId') taskId: string) {
    return this.taskService.getTaskById(taskId);
  }
}
