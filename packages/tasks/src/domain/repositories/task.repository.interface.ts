import { Task } from '../entities/task.entity';

export interface CreateTaskData {
  title: string;
  description: string;
  status: string;
  label: string;
  projectId: string;
  priority: string;
  assigneeId: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  assigneeId?: string;
  status?: string;
  label?: string;
  projectId?: string;
  priority?: string;
}

export interface TaskFilters {
  status?: string;
  label?: string;
  projectId?: string;
  priority?: string;
  search?: string;
}

export abstract class TaskRepository {
  abstract create(data: CreateTaskData): Promise<Task>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(filters?: TaskFilters): Promise<Task[]>;
  abstract update(id: string, data: UpdateTaskData): Promise<Task>;
  abstract delete(id: string): Promise<void>;
  abstract copy(id: string, data?: UpdateTaskData): Promise<Task>;
  abstract exists(id: string): Promise<boolean>;
} 