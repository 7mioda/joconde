export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  BACKLOG = 'BACKLOG',
  CANCELED = 'CANCELED',
}

export enum TaskLabel {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  DOCUMENTATION = 'DOCUMENTATION',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  label: TaskLabel;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _status: TaskStatus;
  private _label: TaskLabel;
  private _projectId: string;
  private _assigneeId: string;
  private _priority: Priority;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: TaskProps) {
    this.validateTitle(props.title);
    this.validateDescription(props.description);
    this.validateProjectId(props.projectId);

    this._id = props.id || this.generateId();
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._label = props.label;
    this._projectId = props.projectId;
    this._assigneeId = props.assigneeId;
    this._priority = props.priority;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get label(): TaskLabel {
    return this._label;
  }

  get projectId(): string {
    return this._projectId;
  }

  get priority(): Priority {
    return this._priority;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get assigneeId(): string {
    return this._assigneeId;
  }

  // Business methods
  updateTitle(title: string): void {
    this.validateTitle(title);
    this._title = title;
    this._updatedAt = new Date();
  }

  updateDescription(description: string): void {
    this.validateDescription(description);
    this._description = description;
    this._updatedAt = new Date();
  }

  updateStatus(status: TaskStatus): void {
    this._status = status;
    this._updatedAt = new Date();
  }

  updateLabel(label: TaskLabel): void {
    this._label = label;
    this._updatedAt = new Date();
  }

  updatePriority(priority: Priority): void {
    this._priority = priority;
    this._updatedAt = new Date();
  }

  updateProjectId(projectId: string): void {
    this.validateProjectId(projectId);
    this._projectId = projectId;
    this._updatedAt = new Date();
  }

  isCompleted(): boolean {
    return this._status === TaskStatus.DONE;
  }

  isInProgress(): boolean {
    return this._status === TaskStatus.IN_PROGRESS;
  }

  isHighPriority(): boolean {
    return this._priority === Priority.HIGH;
  }

  // Validation methods
  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Task title cannot be empty');
    }
    if (title.length > 255) {
      throw new Error('Task title cannot exceed 255 characters');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Task description cannot be empty');
    }
    if (description.length > 1000) {
      throw new Error('Task description cannot exceed 1000 characters');
    }
  }

  private validateProjectId(projectId: string): void {
    if (!projectId || projectId.trim().length === 0) {
      throw new Error('Project ID cannot be empty');
    }
  }

  private generateId(): string {
    return `TASK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  // Serialization
  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
      label: this._label,
      projectId: this._projectId,
      priority: this._priority,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromJSON(data: any): Task {
    return new Task({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as TaskStatus,
      label: data.label as TaskLabel,
      projectId: data.projectId,
      assigneeId: data.assigneeId,
      priority: data.priority as Priority,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    });
  }
} 