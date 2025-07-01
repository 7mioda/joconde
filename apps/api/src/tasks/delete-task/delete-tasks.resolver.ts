import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { DeleteTaskOutput } from './delete-task.output';
import { TrackerService } from '../../shared';

@Resolver(() => DeleteTaskOutput)
export class DeleteTasksResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly trackerService: TrackerService,
  ) {}

  @Mutation(() => DeleteTaskOutput)
  async deleteTask(@Args('id') id: string) {
    try {
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        return { success: false };
      }

      await this.taskService.deleteTask(id);
      this.trackerService.publish({
        type: 'taskDeleted',
        title: `Task deleted`,
        description: `The task "${task.title}" was deleted. The task has been removed from your workspace`,
        payload: {
          taskId: task.id,
          task: {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            label: task.label,
          },
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
