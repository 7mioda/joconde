import { Query, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { Task } from '../task.type';

@Resolver(() => [Task])
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks() {
    return this.taskService.getAllTasks();
  }
}
