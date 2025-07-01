import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { UpdateTaskInput } from './update-task.input';
import { Task } from '../task.type';
import { TrackerService } from '../../shared';

@Resolver(() => Task)
export class UpdateTaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly trackerService: TrackerService,
  ) {}

  @Mutation(() => Task)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskInput,
  ) {
    const task = await this.taskService.updateTask(id, input);
    this.trackerService.publish({
      type: 'taskUpdated',
      title: `Task updated`,
      description: `The task "${task.title}" was modified with updated details. Check the latest changes to stay in sync with your team's progress`,
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
    return task;
  }
}
