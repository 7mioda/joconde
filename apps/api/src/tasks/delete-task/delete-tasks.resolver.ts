import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { DeleteTaskOutput } from './delete-task.output';

@Resolver(() => DeleteTaskOutput)
export class DeleteTasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => DeleteTaskOutput)
  async deleteTask(@Args('id') id: string) {
    try {
      await this.taskService.deleteTask(id);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
