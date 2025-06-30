import { Injectable } from '@nestjs/common';
import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository, CreateProjectData, UpdateProjectData, ProjectFilters } from '../../domain/repositories/project.repository.interface';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository
  ) {}

  async createProject(data: CreateProjectData): Promise<Project> {
    return this.projectRepository.create(data);
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  async getAllProjects(filters?: ProjectFilters): Promise<Project[]> {
    return this.projectRepository.findAll(filters);
  }

  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }

    return this.projectRepository.update(id, data);
  }

  async deleteProject(id: string): Promise<void> {
    const existingProject = await this.projectRepository.findById(id);
    if (!existingProject) {
      throw new Error(`Project with id ${id} not found`);
    }

    await this.projectRepository.delete(id);
  }

  async copyProject(id: string, newOwnerId?: string): Promise<Project> {
    return this.projectRepository.copy(id, newOwnerId);
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return this.projectRepository.findAll({ status });
  }

  async getProjectsByOwner(ownerId: string): Promise<Project[]> {
    return this.projectRepository.findAll({ ownerId });
  }

  async getProjectsByPriority(priority: string): Promise<Project[]> {
    return this.projectRepository.findAll({ priority });
  }

  async searchProjects(searchTerm: string): Promise<Project[]> {
    return this.projectRepository.findAll({ search: searchTerm });
  }

  async getCriticalProjects(): Promise<Project[]> {
    return this.projectRepository.findAll({ priority: 'CRITICAL' });
  }

  async getCompletedProjects(): Promise<Project[]> {
    return this.projectRepository.findAll({ status: 'COMPLETED' });
  }

  async getInProgressProjects(): Promise<Project[]> {
    return this.projectRepository.findAll({ status: 'IN_PROGRESS' });
  }

  async getOnHoldProjects(): Promise<Project[]> {
    return this.projectRepository.findAll({ status: 'ON_HOLD' });
  }

  async projectExists(id: string): Promise<boolean> {
    return this.projectRepository.exists(id);
  }
} 