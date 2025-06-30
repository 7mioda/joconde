import { Injectable } from '@nestjs/common';
import { Member } from '../../domain/entities/member.entity';
import { MemberRepository, CreateMemberData, UpdateMemberData, MemberFilters } from '../../domain/repositories/member.repository';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository
  ) {}

  async createMember(data: CreateMemberData): Promise<Member> {
    return this.memberRepository.create(data);
  }

  async getMemberById(id: string): Promise<Member | null> {
    return this.memberRepository.findById(id);
  }

  async getAllMembers(filters?: MemberFilters): Promise<Member[]> {
    console.log('this.memberRepository. 🔥🔥🔥🔥🔥',  this.memberRepository);
    return this.memberRepository.findAll(filters);
  }

  async updateMember(id: string, data: UpdateMemberData): Promise<Member> {
    const existingMember = await this.memberRepository.findById(id);
    if (!existingMember) {
      throw new Error(`Member with id ${id} not found`);
    }

    return this.memberRepository.update(id, data);
  }

  async deleteMember(id: string): Promise<void> {
    const existingMember = await this.memberRepository.findById(id);
    if (!existingMember) {
      throw new Error(`Member with id ${id} not found`);
    }

    await this.memberRepository.delete(id);
  }

  async searchMembers(searchTerm: string): Promise<Member[]> {
    return this.memberRepository.findAll({ search: searchTerm });
  }

  async memberExists(id: string): Promise<boolean> {
    return this.memberRepository.exists(id);
  }
} 