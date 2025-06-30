import { Member } from '../entities/member.entity';

export interface CreateMemberData {
  firstname: string;
  lastname: string;
  avatar?: string;
  email: string;
}

export interface UpdateMemberData {
  firstname?: string;
  lastname?: string;
  avatar?: string;
  email?: string;
}

export interface MemberFilters {
  search?: string;
}

export abstract class MemberRepository {
  abstract create(data: CreateMemberData): Promise<Member>;
  abstract findById(id: string): Promise<Member | null>;
  abstract findAll(filters?: MemberFilters): Promise<Member[]>;
  abstract update(id: string, data: UpdateMemberData): Promise<Member>;
  abstract delete(id: string): Promise<void>;
  abstract exists(id: string): Promise<boolean>;
} 