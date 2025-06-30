import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository, CreateTaskData, UpdateTaskData, TaskFilters } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async createTask(data: CreateTaskData): Promise<Task> {
    return this.taskRepository.create(data);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async getAllTasks(filters?: TaskFilters): Promise<Task[]> {
    return this.taskRepository.findAll(filters);
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    return this.taskRepository.update(id, data);
  }

  async deleteTask(id: string): Promise<void> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    await this.taskRepository.delete(id);
  }

  async copyTask(id: string, newProjectId?: string): Promise<Task> {
    return this.taskRepository.copy(id, newProjectId);
  }

  async getTasksByStatus(status: string): Promise<Task[]> {
    return this.taskRepository.findAll({ status });
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    return this.taskRepository.findAll({ projectId });
  }

  async getTasksByPriority(priority: string): Promise<Task[]> {
    return this.taskRepository.findAll({ priority });
  }

  async searchTasks(searchTerm: string): Promise<Task[]> {
    return this.taskRepository.findAll({ search: searchTerm });
  }

  async getHighPriorityTasks(): Promise<Task[]> {
    return this.taskRepository.findAll({ priority: 'HIGH' });
  }

  async getCompletedTasks(): Promise<Task[]> {
    return this.taskRepository.findAll({ status: 'DONE' });
  }

  async getInProgressTasks(): Promise<Task[]> {
    return this.taskRepository.findAll({ status: 'IN_PROGRESS' });
  }

  async taskExists(id: string): Promise<boolean> {
    return this.taskRepository.exists(id);
  }
} 