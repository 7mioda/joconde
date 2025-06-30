import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { UpdateTaskInput } from './update-task.input';
import { Task } from '../task.type';

@Resolver(() => Task)
export class UpdateTaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskInput,
  ) {
    return this.taskService.updateTask(id, input);
  }
}
