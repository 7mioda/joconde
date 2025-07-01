import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { CreateTaskInput } from './create-task.input';
import { Task } from '../task.type';
import { TrackerService } from '../../shared';

@Resolver(() => Task)
export class CreateTaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly trackerService: TrackerService,
  ) {}

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput) {
    const task = await this.taskService.createTask(input);
    this.trackerService.publish({
      type: 'taskCreated',
      title: `Task created`,
      description: `A new task "${task.title}" was created. Check it out and stay updated with your team's progress`,
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