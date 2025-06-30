import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../../prisma/types';
import { Member } from '../../domain/entities/member.entity';
import { MemberRepository, CreateMemberData, UpdateMemberData, MemberFilters } from '../../domain/repositories/member.repository';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
  private prisma: PrismaClient;

  onModuleInit() {
    this.prisma = new PrismaClient();
  }

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateMemberData): Promise<Member> {
    const memberData = await this.prisma.member.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        avatar: data.avatar,
        email: data.email,
      },
    });

    return this.mapPrismaToDomain(memberData);
  }

  async findById(id: string): Promise<Member | null> {
    const memberData = await this.prisma.member.findUnique({
      where: { id },
    });

    if (!memberData) {
      return null;
    }

    return this.mapPrismaToDomain(memberData);
  }

  async findAll(filters?: MemberFilters): Promise<Member[]> {
    const where: any = {};

    if (filters?.search) {
      where.OR = [
        { firstname: { contains: filters.search, mode: 'insensitive' } },
        { lastname: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const membersData = await this.prisma.member.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return membersData.map(memberData => this.mapPrismaToDomain(memberData));
  }

  async update(id: string, data: UpdateMemberData): Promise<Member> {
    const updateData: any = {};

    if (data.firstname !== undefined) {
      updateData.firstname = data.firstname;
    }

    if (data.lastname !== undefined) {
      updateData.lastname = data.lastname;
    }

    if (data.avatar !== undefined) {
      updateData.avatar = data.avatar;
    }

    const memberData = await this.prisma.member.update({
      where: { id },
      data: updateData,
    });

    return this.mapPrismaToDomain(memberData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.member.count({
      where: { id },
    });

    return count > 0;
  }

  private mapPrismaToDomain(prismaMember: any): Member {
    return new Member({
      id: prismaMember.id,
      email: prismaMember.email,
      firstname: prismaMember.firstname,
      lastname: prismaMember.lastname,
      avatar: prismaMember.avatar,
      createdAt: prismaMember.createdAt,
      updatedAt: prismaMember.updatedAt,
    });
  }
} 