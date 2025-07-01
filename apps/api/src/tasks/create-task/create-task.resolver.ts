import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TaskService } from '@server/tasks';
import { CreateTaskInput } from './create-task.input';
import { Task } from '../task.type';

@Resolver(() => Task)
export class CreateTaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.taskService.createTask(input);
  }
} 