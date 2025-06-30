import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/types';
import { Project, ProjectStatus, Priority } from '../../domain/entities/project.entity';
import { ProjectRepository, CreateProjectData, UpdateProjectData, ProjectFilters } from '../../domain/repositories/project.repository.interface';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateProjectData): Promise<Project> {
    const projectData = await this.prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        status: this.mapStatusToPrisma(data.status),
        priority: this.mapPriorityToPrisma(data.priority),
        startDate: data.startDate,
        endDate: data.endDate,
        ownerId: data.ownerId,
      },
    });

    return this.mapPrismaToDomain(projectData);
  }

  async findById(id: string): Promise<Project | null> {
    const projectData = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!projectData) {
      return null;
    }

    return this.mapPrismaToDomain(projectData);
  }

  async findAll(filters?: ProjectFilters): Promise<Project[]> {
    const where: any = {};

    if (filters?.status) {
      where.status = this.mapStatusToPrisma(filters.status);
    }

    if (filters?.priority) {
      where.priority = this.mapPriorityToPrisma(filters.priority);
    }

    if (filters?.ownerId) {
      where.ownerId = filters.ownerId;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const projectsData = await this.prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return projectsData.map(projectData => this.mapPrismaToDomain(projectData));
  }

  async update(id: string, data: UpdateProjectData): Promise<Project> {
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

    if (data.priority !== undefined) {
      updateData.priority = this.mapPriorityToPrisma(data.priority);
    }

    if (data.startDate !== undefined) {
      updateData.startDate = data.startDate;
    }

    if (data.endDate !== undefined) {
      updateData.endDate = data.endDate;
    }

    if (data.ownerId !== undefined) {
      updateData.ownerId = data.ownerId;
    }

    const projectData = await this.prisma.project.update({
      where: { id },
      data: updateData,
    });

    return this.mapPrismaToDomain(projectData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }

  async copy(id: string, newOwnerId?: string): Promise<Project> {
    const originalProject = await this.findById(id);
    if (!originalProject) {
      throw new Error(`Project with id ${id} not found`);
    }

    const copyData: CreateProjectData = {
      title: `${originalProject.title} (Copy)`,
      description: originalProject.description,
      status: originalProject.status,
      priority: originalProject.priority,
      startDate: originalProject.startDate,
      endDate: originalProject.endDate,
      ownerId: newOwnerId || originalProject.ownerId,
    };

    return this.create(copyData);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.project.count({
      where: { id },
    });

    return count > 0;
  }

  private mapPrismaToDomain(prismaProject: any): Project {
    return new Project({
      id: prismaProject.id,
      title: prismaProject.title,
      description: prismaProject.description,
      status: this.mapStatusFromPrisma(prismaProject.status),
      priority: this.mapPriorityFromPrisma(prismaProject.priority),
      startDate: prismaProject.startDate,
      endDate: prismaProject.endDate,
      ownerId: prismaProject.ownerId,
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt,
    });
  }

  private mapStatusToPrisma(status: string): any {
    switch (status.toUpperCase()) {
      case 'PLANNING':
        return 'PLANNING';
      case 'IN_PROGRESS':
        return 'IN_PROGRESS';
      case 'COMPLETED':
        return 'COMPLETED';
      case 'ON_HOLD':
        return 'ON_HOLD';
      case 'CANCELLED':
        return 'CANCELLED';
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }

  private mapStatusFromPrisma(status: string): ProjectStatus {
    switch (status) {
      case 'PLANNING':
        return ProjectStatus.PLANNING;
      case 'IN_PROGRESS':
        return ProjectStatus.IN_PROGRESS;
      case 'COMPLETED':
        return ProjectStatus.COMPLETED;
      case 'ON_HOLD':
        return ProjectStatus.ON_HOLD;
      case 'CANCELLED':
        return ProjectStatus.CANCELLED;
      default:
        throw new Error(`Invalid status: ${status}`);
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
      case 'CRITICAL':
        return 'CRITICAL';
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
      case 'CRITICAL':
        return Priority.CRITICAL;
      default:
        throw new Error(`Invalid priority: ${priority}`);
    }
  }
} 