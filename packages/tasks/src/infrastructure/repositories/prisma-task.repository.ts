import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Task, TaskStatus, TaskLabel, Priority } from '../../domain/entities/task.entity';
import { TaskRepository, CreateTaskData, UpdateTaskData, TaskFilters } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateTaskData): Promise<Task> {
    const taskData = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: this.mapStatusToPrisma(data.status),
        label: this.mapLabelToPrisma(data.label),
        projectId: data.projectId,
        priority: this.mapPriorityToPrisma(data.priority),
        assigneeId: data.assigneeId,
      },
    });

    return this.mapPrismaToDomain(taskData);
  }

  async findById(id: string): Promise<Task | null> {
    const taskData = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskData) {
      return null;
    }

    return this.mapPrismaToDomain(taskData);
  }

  async findAll(filters?: TaskFilters): Promise<Task[]> {
    const where: any = {};

    if (filters?.status) {
      where.status = this.mapStatusToPrisma(filters.status);
    }

    if (filters?.label) {
      where.label = this.mapLabelToPrisma(filters.label);
    }

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }

    if (filters?.priority) {
      where.priority = this.mapPriorityToPrisma(filters.priority);
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const tasksData = await this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return tasksData.map(taskData => this.mapPrismaToDomain(taskData));
  }

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    const updateData: any = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.description !== undefined) {
      updateData.description = data.description;
    }

    if (data.status !== undefined) {
      updateData.status = this.mapStatusToPrisma(data.status);
    }

    if (data.label !== undefined) {
      updateData.label = this.mapLabelToPrisma(data.label);
    }

    if (data.projectId !== undefined) {
      updateData.projectId = data.projectId;
    }

    if (data.priority !== undefined) {
      updateData.priority = this.mapPriorityToPrisma(data.priority);
    }

    const taskData = await this.prisma.task.update({
      where: { id },
      data: updateData,
    });

    return this.mapPrismaToDomain(taskData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async copy(id: string, newProjectId?: string): Promise<Task> {
    const originalTask = await this.findById(id);
    if (!originalTask) {
      throw new Error(`Task with id ${id} not found`);
    }

    const copyData: CreateTaskData = {
      title: `${originalTask.title} (Copy)`,
      description: originalTask.description,
      status: originalTask.status,
      label: originalTask.label,
      projectId: newProjectId || originalTask.projectId,
      priority: originalTask.priority,
      assigneeId: originalTask.assigneeId,
    };

    return this.create(copyData);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.task.count({
      where: { id },
    });

    return count > 0;
  }

  private mapPrismaToDomain(prismaTask: any): Task {
    return new Task({
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description,
      status: this.mapStatusFromPrisma(prismaTask.status),
      label: this.mapLabelFromPrisma(prismaTask.label),
      projectId: prismaTask.projectId,
      priority: this.mapPriorityFromPrisma(prismaTask.priority),
      assigneeId: prismaTask.assigneeId,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }

  private mapStatusToPrisma(status: string): any {
    switch (status.toUpperCase()) {
      case 'TODO':
        return 'TODO';
      case 'IN_PROGRESS':
        return 'IN_PROGRESS';
      case 'DONE':
        return 'DONE';
      case 'BACKLOG':
        return 'BACKLOG';
      case 'CANCELED':
        return 'CANCELED';
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  private mapStatusFromPrisma(status: string): TaskStatus {
    switch (status) {
      case 'TODO':
        return TaskStatus.TODO;
      case 'IN_PROGRESS':
        return TaskStatus.IN_PROGRESS;
      case 'DONE':
        return TaskStatus.DONE;
      case 'BACKLOG':
        return TaskStatus.BACKLOG;
      case 'CANCELED':
        return TaskStatus.CANCELED;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  private mapLabelToPrisma(label: string): any {
    switch (label.toUpperCase()) {
      case 'BUG':
        return 'BUG';
      case 'FEATURE':
        return 'FEATURE';
      case 'DOCUMENTATION':
        return 'DOCUMENTATION';
      default:
        throw new Error(`Invalid label: ${label}`);
    }
  }

  private mapLabelFromPrisma(label: string): TaskLabel {
    switch (label) {
      case 'BUG':
        return TaskLabel.BUG;
      case 'FEATURE':
        return TaskLabel.FEATURE;
      case 'DOCUMENTATION':
        return TaskLabel.DOCUMENTATION;
      default:
        throw new Error(`Invalid label: ${label}`);
    }
  }

  private mapPriorityToPrisma(priority: string): any {
    switch (priority.toUpperCase()) {
      case 'LOW':
        return 'LOW';
      case 'MEDIUM':
        return 'MEDIUM';
      case 'HIGH':
        return 'HIGH';
      default:
        throw new Error(`Invalid priority: ${priority}`);
    }
  }

  private mapPriorityFromPrisma(priority: string): Priority {
    switch (priority) {
      case 'LOW':
        return Priority.LOW;
      case 'MEDIUM':
        return Priority.MEDIUM;
      case 'HIGH':
        return Priority.HIGH;
      default:
        throw new Error(`Invalid priority: ${priority}`);
    }
  }
} 