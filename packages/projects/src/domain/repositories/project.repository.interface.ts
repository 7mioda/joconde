import { Project } from '../entities/project.entity';

export interface CreateProjectData {
  title: string;
  description: string;
  status: string;
  priority: string;
  startDate?: Date;
  endDate?: Date;
  ownerId: string;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  startDate?: Date;
  endDate?: Date;
  ownerId?: string;
}

export interface ProjectFilters {
  status?: string;
  priority?: string;
  ownerId?: string;
  search?: string;
}

export abstract class ProjectRepository {
  abstract create(data: CreateProjectData): Promise<Project>;
  abstract findById(id: string): Promise<Project | null>;
  abstract findAll(filters?: ProjectFilters): Promise<Project[]>;
  abstract update(id: string, data: UpdateProjectData): Promise<Project>;
  abstract delete(id: string): Promise<void>;
  abstract copy(id: string, newOwnerId?: string): Promise<Project>;
  abstract exists(id: string): Promise<boolean>;
} 