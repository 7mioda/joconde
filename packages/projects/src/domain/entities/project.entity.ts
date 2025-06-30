export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface ProjectProps {
  id?: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate?: Date;
  endDate?: Date;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _status: ProjectStatus;
  private _priority: Priority;
  private _startDate?: Date;
  private _endDate?: Date;
  private _ownerId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ProjectProps) {
    this.validateTitle(props.title);
    this.validateDescription(props.description);
    this.validateOwnerId(props.ownerId);
    this.validateDates(props.startDate, props.endDate);

    this._id = props.id || this.generateId();
    this._title = props.title;
    this._description = props.description;
    this._status = props.status;
    this._priority = props.priority;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._ownerId = props.ownerId;
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

  get status(): ProjectStatus {
    return this._status;
  }

  get priority(): Priority {
    return this._priority;
  }

  get startDate(): Date | undefined {
    return this._startDate;
  }

  get endDate(): Date | undefined {
    return this._endDate;
  }

  get ownerId(): string {
    return this._ownerId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
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

  updateStatus(status: ProjectStatus): void {
    this._status = status;
    this._updatedAt = new Date();
  }

  updatePriority(priority: Priority): void {
    this._priority = priority;
    this._updatedAt = new Date();
  }

  updateStartDate(startDate: Date | undefined): void {
    this.validateDates(startDate, this._endDate);
    this._startDate = startDate;
    this._updatedAt = new Date();
  }

  updateEndDate(endDate: Date | undefined): void {
    this.validateDates(this._startDate, endDate);
    this._endDate = endDate;
    this._updatedAt = new Date();
  }

  updateOwnerId(ownerId: string): void {
    this.validateOwnerId(ownerId);
    this._ownerId = ownerId;
    this._updatedAt = new Date();
  }

  isCompleted(): boolean {
    return this._status === ProjectStatus.COMPLETED;
  }

  isInProgress(): boolean {
    return this._status === ProjectStatus.IN_PROGRESS;
  }

  isOnHold(): boolean {
    return this._status === ProjectStatus.ON_HOLD;
  }

  isCritical(): boolean {
    return this._priority === Priority.CRITICAL;
  }

  isOverdue(): boolean {
    if (!this._endDate) return false;
    return new Date() > this._endDate && !this.isCompleted();
  }

  getDuration(): number | undefined {
    if (!this._startDate || !this._endDate) return undefined;
    return Math.ceil((this._endDate.getTime() - this._startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Validation methods
  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Project title cannot be empty');
    }
    if (title.length > 255) {
      throw new Error('Project title cannot exceed 255 characters');
    }
  }

  private validateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Project description cannot be empty');
    }
    if (description.length > 1000) {
      throw new Error('Project description cannot exceed 1000 characters');
    }
  }

  private validateOwnerId(ownerId: string): void {
    if (!ownerId || ownerId.trim().length === 0) {
      throw new Error('Owner ID cannot be empty');
    }
  }

  private validateDates(startDate?: Date, endDate?: Date): void {
    if (startDate && endDate && startDate > endDate) {
      throw new Error('Start date cannot be after end date');
    }
  }

  private generateId(): string {
    return `PROJ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  // Serialization
  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      status: this._status,
      priority: this._priority,
      startDate: this._startDate,
      endDate: this._endDate,
      ownerId: this._ownerId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromJSON(data: any): Project {
    return new Project({
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status as ProjectStatus,
      priority: data.priority as Priority,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      ownerId: data.ownerId,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    });
  }
} 