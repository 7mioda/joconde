export interface MemberProps {
  id?: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Member {
  private readonly _id: string;
  private _firstname: string;
  private _lastname: string;
  private _avatar?: string;
  private _email: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: MemberProps) {
    this.validateFirstname(props.firstname);
    this.validateLastname(props.lastname);
    this._email = props.email;
    if (props.avatar) {
      this.validateAvatar(props.avatar);
    }

    this._id = props.id || this.generateId();
    this._firstname = props.firstname;
    this._lastname = props.lastname;
    this._avatar = props.avatar;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get firstname(): string {
    return this._firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  get name(): string {
    return `${this._firstname} ${this._lastname}`;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Business methods
  updateFirstname(firstname: string): void {
    this.validateFirstname(firstname);
    this._firstname = firstname;
    this._updatedAt = new Date();
  }

  updateLastname(lastname: string): void {
    this.validateLastname(lastname);
    this._lastname = lastname;
    this._updatedAt = new Date();
  }

  updateAvatar(avatar: string): void {
    this.validateAvatar(avatar);
    this._avatar = avatar;
    this._updatedAt = new Date();
  }

  removeAvatar(): void {
    this._avatar = undefined;
    this._updatedAt = new Date();
  }

  // Validation methods
  private validateFirstname(firstname: string): void {
    if (!firstname || firstname.trim().length === 0) {
      throw new Error('Member firstname cannot be empty');
    }
    if (firstname.length > 100) {
      throw new Error('Member firstname cannot exceed 100 characters');
    }
  }

  private validateLastname(lastname: string): void {
    if (!lastname || lastname.trim().length === 0) {
      throw new Error('Member lastname cannot be empty');
    }
    if (lastname.length > 100) {
      throw new Error('Member lastname cannot exceed 100 characters');
    }
  }

  private validateAvatar(avatar: string): void {
    if (!avatar || avatar.trim().length === 0) {
      throw new Error('Avatar URL cannot be empty');
    }
    try {
      new URL(avatar);
    } catch {
      throw new Error('Avatar must be a valid URL');
    }
  }

  private generateId(): string {
    return `MEMBER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  // Serialization
  toJSON() {
    return {
      id: this._id,
      firstname: this._firstname,
      lastname: this._lastname,
      name: this.name,
      avatar: this._avatar,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromJSON(data: any): Member {
    return new Member({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      avatar: data.avatar,
      email: data.email,
      createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    });
  }
} 