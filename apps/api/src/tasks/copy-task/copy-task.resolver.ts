import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { CopyTaskInput } from './copy-task.input';
import { Task } from '../task.type';
import { TrackerService } from '../../shared';

@Resolver(() => Task)
export class CopyTaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly trackerService: TrackerService,
  ) {}

  @Mutation(() => Task)
  async copyTask(
    @Args('taskId') taskId: string,
    @Args('input') input: CopyTaskInput,
  ) {
    const task = await this.taskService.copyTask(taskId, input);
    this.trackerService.publish({
      type: 'taskCopied',
      title: `Task copied`,
      description: `The task "${task.title}" was copied. Check the latest changes to stay in sync with your team's progress`,
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
